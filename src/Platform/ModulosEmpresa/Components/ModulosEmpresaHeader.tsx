import { useNavigate } from "react-router-dom";

interface ModulosEmpresaHeaderProps {
  onNuevaAsignacion: () => void;
  onRecargar: () => void;
}

export const ModulosEmpresaHeader = ({
  onNuevaAsignacion,
  onRecargar,
}: ModulosEmpresaHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-[28px] bg-gradient-to-r from-indigo-500 via-indigo-700 to-slate-950 px-6 py-6 text-white shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-white/80 transition hover:text-white"
          >
            ← Volver al dashboard
          </button>

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Módulos Empresa
            </h1>
            <p className="mt-1 text-sm text-white/80">
              Asigna y controla módulos habilitados por empresa.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onNuevaAsignacion}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-95"
          >
            + Asignar módulo
          </button>

          <button
            type="button"
            onClick={onRecargar}
            className="rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Recargar
          </button>
        </div>
      </div>
    </div>
  );
};
