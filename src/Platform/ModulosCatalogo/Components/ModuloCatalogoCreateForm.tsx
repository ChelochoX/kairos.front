import { TextField } from "../../../Shared/Components/ui/TextField";
import type { CrearModuloCatalogoRequest } from "../Types/modulo-catalogo.types";

interface ModuloCatalogoCreateFormProps {
  form: CrearModuloCatalogoRequest;
  saving: boolean;
  onChange: (field: keyof CrearModuloCatalogoRequest, value: string) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ModuloCatalogoCreateForm = ({
  form,
  saving,
  onChange,
  onCancel,
  onSubmit,
}: ModuloCatalogoCreateFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Código del módulo"
          value={form.codigoModulo}
          onChange={(value) => onChange("codigoModulo", value)}
          required
          placeholder="Ej: MARKETPLACE"
        />

        <TextField
          label="Nombre"
          value={form.nombre}
          onChange={(value) => onChange("nombre", value)}
          required
          placeholder="Ej: Marketplace"
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
          placeholder="Describe el propósito del módulo."
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
          {saving ? "Guardando..." : "Crear módulo"}
        </button>
      </div>
    </form>
  );
};
