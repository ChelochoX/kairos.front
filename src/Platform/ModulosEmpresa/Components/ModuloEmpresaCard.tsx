import type { ModuloEmpresa } from "../Types/modulo-empresa.types";

interface ModuloEmpresaCardProps {
  modulo: ModuloEmpresa;
  changingStatus?: boolean;
  deleting?: boolean;
  onVerDetalle: (modulo: ModuloEmpresa) => void;
  onToggleActivo: (modulo: ModuloEmpresa) => void;
  onEliminar: (modulo: ModuloEmpresa) => void;
}

export const ModuloEmpresaCard = ({
  modulo,
  changingStatus = false,
  deleting = false,
  onVerDetalle,
  onToggleActivo,
  onEliminar,
}: ModuloEmpresaCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-slate-900">
            {modulo.nombreModulo}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            <span className="font-semibold text-slate-700">Código:</span>{" "}
            {modulo.codigoModulo || "-"}
          </p>

          <p className="mt-2 line-clamp-3 text-sm text-slate-500">
            {modulo.descripcionModulo || "Sin descripción."}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ${
            modulo.activo
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {modulo.activo ? "Activo" : "Inactivo"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onVerDetalle(modulo)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Ver detalle
        </button>

        <button
          type="button"
          onClick={() => onToggleActivo(modulo)}
          disabled={changingStatus}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            modulo.activo
              ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          } ${changingStatus ? "cursor-not-allowed opacity-60" : ""}`}
        >
          {changingStatus
            ? "Procesando..."
            : modulo.activo
              ? "Desactivar"
              : "Activar"}
        </button>

        <button
          type="button"
          onClick={() => onEliminar(modulo)}
          disabled={deleting}
          className={`rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${
            deleting ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {deleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
};
