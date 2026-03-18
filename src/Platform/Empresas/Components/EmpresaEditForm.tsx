import { TextField } from "../../../Shared/Components/ui/TextField";
import type { ActualizarEmpresaRequest } from "../Types/empresa.types";

interface EmpresaEditFormProps {
  form: ActualizarEmpresaRequest;
  saving: boolean;
  onChange: (field: keyof ActualizarEmpresaRequest, value: string) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const EmpresaEditForm = ({
  form,
  saving,
  onChange,
  onCancel,
  onSubmit,
}: EmpresaEditFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Nombre comercial"
          value={form.nombreComercial}
          onChange={(value) => onChange("nombreComercial", value)}
          required
        />

        <TextField
          label="Rubro"
          value={form.rubro}
          onChange={(value) => onChange("rubro", value)}
          required
        />
      </div>

      <TextField
        label="Razón social"
        value={form.razonSocial ?? ""}
        onChange={(value) => onChange("razonSocial", value)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Moneda"
          value={form.moneda ?? ""}
          onChange={(value) => onChange("moneda", value)}
        />

        <TextField
          label="WhatsApp"
          value={form.whatsAppContacto ?? ""}
          onChange={(value) => onChange("whatsAppContacto", value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Email"
          type="email"
          value={form.emailContacto ?? ""}
          onChange={(value) => onChange("emailContacto", value)}
        />

        <TextField
          label="Logo Public Id"
          value={form.logoPublicId ?? ""}
          onChange={(value) => onChange("logoPublicId", value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Color primario"
          value={form.colorPrimario ?? ""}
          onChange={(value) => onChange("colorPrimario", value)}
          placeholder="#4f46e5"
        />

        <TextField
          label="Color secundario"
          value={form.colorSecundario ?? ""}
          onChange={(value) => onChange("colorSecundario", value)}
          placeholder="#0f172a"
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
