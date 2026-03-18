import { useNavigate } from "react-router-dom";
import type { FiltroActiva } from "../Types/empresa.types";

interface EmpresasHeaderProps {
  filtroActiva: FiltroActiva;
  onChangeFiltro: (value: FiltroActiva) => void;
  onNuevaEmpresa: () => void;
  onRecargar: () => void;
}

export const EmpresasHeader = ({
  filtroActiva,
  onChangeFiltro,
  onNuevaEmpresa,
  onRecargar,
}: EmpresasHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-r from-indigo-500 to-slate-900 p-6 text-white shadow-[var(--shadow-md)]">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          ← Volver al dashboard
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Empresas
          </h2>
          <p className="mt-1 text-sm text-white/80 sm:text-base">
            Gestiona tus empresas desde un solo lugar.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onNuevaEmpresa}
            className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            + Nueva empresa
          </button>

          <select
            value={filtroActiva}
            onChange={(e) =>
              onChangeFiltro(
                e.target.value as "todas" | "activas" | "inactivas",
              )
            }
            className="rounded-2xl border border-white/20 bg-white/95 px-3 py-2.5 text-sm text-slate-900 outline-none"
          >
            <option value="todas">Todas</option>
            <option value="activas">Activas</option>
            <option value="inactivas">Inactivas</option>
          </select>

          <button
            type="button"
            onClick={onRecargar}
            className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-white/15"
          >
            Recargar
          </button>
        </div>
      </div>
    </section>
  );
};
