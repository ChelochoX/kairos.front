import { TextField } from "../../../Shared/Components/ui/TextField";
import type {
  ActualizarUsuarioPlataformaRequest,
  RolPlataforma,
} from "../Types/usuario-plataforma.types";

interface UsuarioPlataformaEditFormProps {
  form: ActualizarUsuarioPlataformaRequest;
  roles: RolPlataforma[];
  loadingRoles: boolean;
  saving: boolean;
  onChange: (
    field: keyof ActualizarUsuarioPlataformaRequest,
    value: string,
  ) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const UsuarioPlataformaEditForm = ({
  form,
  roles,
  loadingRoles,
  saving,
  onChange,
  onCancel,
  onSubmit,
}: UsuarioPlataformaEditFormProps) => {
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

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Rol <span className="text-red-500">*</span>
          </label>

          <select
            value={form.rol}
            onChange={(e) => onChange("rol", e.target.value)}
            required
            disabled={loadingRoles || saving}
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">
              {loadingRoles ? "Cargando roles..." : "Seleccionar rol"}
            </option>

            {roles.map((rol) => (
              <option key={rol.rolId} value={rol.codigoRol}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </div>
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
          disabled={saving || loadingRoles}
          className="rounded-xl bg-[var(--color-text)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};
