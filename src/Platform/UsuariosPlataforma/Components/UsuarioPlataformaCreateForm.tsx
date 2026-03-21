import { TextField } from "../../../Shared/Components/ui/TextField";
import type { CrearUsuarioPlataformaRequest } from "../Types/usuario-plataforma.types";

interface UsuarioPlataformaCreateFormProps {
  form: CrearUsuarioPlataformaRequest;
  saving: boolean;
  onChange: (field: keyof CrearUsuarioPlataformaRequest, value: string) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const UsuarioPlataformaCreateForm = ({
  form,
  saving,
  onChange,
  onCancel,
  onSubmit,
}: UsuarioPlataformaCreateFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Nombre"
          value={form.nombre}
          onChange={(value) => onChange("nombre", value)}
          required
        />

        <TextField
          label="Usuario"
          value={form.usuario}
          onChange={(value) => onChange("usuario", value)}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Email"
          type="email"
          value={form.email ?? ""}
          onChange={(value) => onChange("email", value)}
        />

        <TextField
          label="Rol"
          value={form.rol}
          onChange={(value) => onChange("rol", value)}
          required
          placeholder="Ej: SUPER_ADMIN"
        />
      </div>

      <TextField
        label="Clave"
        type="password"
        value={form.clave}
        onChange={(value) => onChange("clave", value)}
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
          {saving ? "Guardando..." : "Crear usuario"}
        </button>
      </div>
    </form>
  );
};
