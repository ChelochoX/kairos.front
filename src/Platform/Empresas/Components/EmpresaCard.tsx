import type { Empresa } from "../Types/empresa.types";
import { EstadoEmpresaBadge } from "./EstadoEmpresaBadge";

interface EmpresaCardProps {
  empresa: Empresa;
  changingStatus: boolean;
  onVerDetalle: (empresa: Empresa) => void;
  onEditar: (empresa: Empresa) => void;
  onToggleActiva: (empresa: Empresa) => void;
}

export const EmpresaCard = ({
  empresa,
  changingStatus,
  onVerDetalle,
  onEditar,
  onToggleActiva,
}: EmpresaCardProps) => {
  return (
    <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-sm)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-[var(--color-text)]">
            {empresa.nombreComercial}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            {empresa.codigoEmpresa}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            {empresa.rubro}
          </p>
        </div>

        <EstadoEmpresaBadge activa={empresa.activa} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onVerDetalle(empresa)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Ver detalle
        </button>

        <button
          type="button"
          onClick={() => onEditar(empresa)}
          className="rounded-xl bg-[var(--color-text)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onToggleActiva(empresa)}
          disabled={changingStatus}
          className={`rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
            empresa.activa
              ? "bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100"
              : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
          }`}
        >
          {changingStatus
            ? "Procesando..."
            : empresa.activa
              ? "Desactivar"
              : "Activar"}
        </button>
      </div>
    </article>
  );
};
