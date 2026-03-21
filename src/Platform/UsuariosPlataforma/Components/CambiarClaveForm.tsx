import { TextField } from "../../../Shared/Components/ui/TextField";
import type { CambiarClaveUsuarioPlataformaRequest } from "../Types/usuario-plataforma.types";

interface CambiarClaveFormProps {
  form: CambiarClaveUsuarioPlataformaRequest;
  saving: boolean;
  onChange: (
    field: keyof CambiarClaveUsuarioPlataformaRequest,
    value: string,
  ) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const CambiarClaveForm = ({
  form,
  saving,
  onChange,
  onCancel,
  onSubmit,
}: CambiarClaveFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <TextField
        label="Nueva clave"
        type="password"
        value={form.nuevaClave}
        onChange={(value) => onChange("nuevaClave", value)}
        required
      />

      <TextField
        label="Confirmar nueva clave"
        type="password"
        value={form.confirmarNuevaClave}
        onChange={(value) => onChange("confirmarNuevaClave", value)}
        required
      />

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
          {saving ? "Actualizando..." : "Actualizar clave"}
        </button>
      </div>
    </form>
  );
};
