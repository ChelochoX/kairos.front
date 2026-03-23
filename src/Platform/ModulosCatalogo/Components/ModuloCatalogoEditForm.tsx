import { TextField } from "../../../Shared/Components/ui/TextField";
import type { ActualizarModuloCatalogoRequest } from "../Types/modulo-catalogo.types";

interface ModuloCatalogoEditFormProps {
  form: ActualizarModuloCatalogoRequest;
  saving: boolean;
  onChange: (
    field: keyof ActualizarModuloCatalogoRequest,
    value: string,
  ) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ModuloCatalogoEditForm = ({
  form,
  saving,
  onChange,
  onCancel,
  onSubmit,
}: ModuloCatalogoEditFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Código del módulo"
          value={form.codigoModulo}
          onChange={(value) => onChange("codigoModulo", value)}
          required
        />

        <TextField
          label="Nombre"
          value={form.nombre}
          onChange={(value) => onChange("nombre", value)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[var(--color-text)]">
          Descripción
        </label>
        <textarea
          value={form.descripcion}
          onChange={(e) => onChange("descripcion", e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)]"
        />
      </div>

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
          disabled={saving}
          className="rounded-xl bg-[var(--color-text)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};
