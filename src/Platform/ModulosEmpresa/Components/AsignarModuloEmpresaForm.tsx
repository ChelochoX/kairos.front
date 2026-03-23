import type {
  AsignarModuloEmpresaRequest,
  ModuloCatalogoOption,
} from "../Types/modulo-empresa.types";

interface AsignarModuloEmpresaFormProps {
  form: AsignarModuloEmpresaRequest;
  opciones: ModuloCatalogoOption[];
  loadingOpciones: boolean;
  saving: boolean;
  onChange: (field: keyof AsignarModuloEmpresaRequest, value: number) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AsignarModuloEmpresaForm = ({
  form,
  opciones,
  loadingOpciones,
  saving,
  onChange,
  onCancel,
  onSubmit,
}: AsignarModuloEmpresaFormProps) => {
  const moduloSeleccionado =
    opciones.find((x) => x.moduloId === form.moduloId) ?? null;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[var(--color-text)]">
          Módulo <span className="text-red-500">*</span>
        </label>

        <select
          value={form.moduloId || ""}
          onChange={(e) => onChange("moduloId", Number(e.target.value))}
          required
          disabled={loadingOpciones || saving}
          className="w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="">
            {loadingOpciones ? "Cargando módulos..." : "Seleccionar módulo"}
          </option>

          {opciones.map((modulo) => (
            <option key={modulo.moduloId} value={modulo.moduloId}>
              {modulo.nombre} ({modulo.codigoModulo})
            </option>
          ))}
        </select>
      </div>

      {moduloSeleccionado && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            {moduloSeleccionado.nombre}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Código: {moduloSeleccionado.codigoModulo}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {moduloSeleccionado.descripcion || "Sin descripción."}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-card-hover)]"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={saving || loadingOpciones}
          className="rounded-xl bg-[var(--color-text)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Asignar módulo"}
        </button>
      </div>
    </form>
  );
};
