import { useNavigate } from "react-router-dom";
import { ModulePageHeader } from "../../../Shared/Components/ui/ModulePageHeader";
import type { FiltroActivo } from "../Types/usuario-plataforma.types";

interface UsuariosPlataformaHeaderProps {
  filtroActivo: FiltroActivo;
  onChangeFiltro: (value: FiltroActivo) => void;
  onNuevoUsuario: () => void;
  onRecargar: () => void;
}

export const UsuariosPlataformaHeader = ({
  filtroActivo,
  onChangeFiltro,
  onNuevoUsuario,
  onRecargar,
}: UsuariosPlataformaHeaderProps) => {
  const navigate = useNavigate();

  return (
    <ModulePageHeader
      title="Usuarios Plataforma"
      subtitle="Administra usuarios administrativos y sus accesos."
      onBack={() => navigate("/dashboard")}
      backLabel="Volver al dashboard"
      actions={
        <>
          <button
            type="button"
            onClick={onNuevoUsuario}
            className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            + Nuevo usuario
          </button>

          <select
            value={filtroActivo}
            onChange={(e) =>
              onChangeFiltro(
                e.target.value as "todos" | "activos" | "inactivos",
              )
            }
            className="rounded-2xl border border-white/20 bg-white/95 px-3 py-2.5 text-sm text-slate-900 outline-none"
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
          </select>

          <button
            type="button"
            onClick={onRecargar}
            className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-white/15"
          >
            Recargar
          </button>
        </>
      }
    />
  );
};
