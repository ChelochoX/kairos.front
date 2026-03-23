import type { ModuloCatalogo } from "../Types/modulo-catalogo.types";

interface ModuloCatalogoDetailPanelProps {
  modulo: ModuloCatalogo;
  changingStatus: boolean;
  onEditar: (modulo: ModuloCatalogo) => void;
  onToggleActivo: (modulo: ModuloCatalogo) => void;
}

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("es-PY");
};

export const ModuloCatalogoDetailPanel = ({
  modulo,
  changingStatus,
  onEditar,
  onToggleActivo,
}: ModuloCatalogoDetailPanelProps) => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">
              {modulo.nombre}
            </h3>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">Código:</span>{" "}
              {modulo.codigoModulo}
            </p>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              modulo.activo
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {modulo.activo ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Descripción
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {modulo.descripcion || "Sin descripción."}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Fechas
            </p>
            <div className="mt-2 space-y-2 text-sm text-slate-700">
              <p>
                <span className="font-semibold">Registro:</span>{" "}
                {formatDate(modulo.fechaRegistro)}
              </p>
              <p>
                <span className="font-semibold">Modificación:</span>{" "}
                {formatDate(modulo.fechaModificacion)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEditar(modulo)}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => onToggleActivo(modulo)}
            disabled={changingStatus}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
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
        </div>
      </div>
    </div>
  );
};
