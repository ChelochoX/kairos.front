import { CambiarClaveForm } from "./CambiarClaveForm";
import { UsuarioPlataformaCreateForm } from "./UsuarioPlataformaCreateForm";
import { UsuarioPlataformaDetailPanel } from "./UsuarioPlataformaDetailPanel";
import { UsuarioPlataformaEditForm } from "./UsuarioPlataformaEditForm";
import type {
  ActualizarUsuarioPlataformaRequest,
  CambiarClaveUsuarioPlataformaRequest,
  CrearUsuarioPlataformaRequest,
  UsuarioPlataforma,
} from "../Types/usuario-plataforma.types";

type Mode = "list" | "detail" | "edit" | "create" | "password";

interface UsuarioPlataformaPanelProps {
  mode: Mode;
  selectedUsuario: UsuarioPlataforma | null;
  changingStatus: boolean;
  createForm: CrearUsuarioPlataformaRequest;
  editForm: ActualizarUsuarioPlataformaRequest;
  passwordForm: CambiarClaveUsuarioPlataformaRequest;
  savingCreate: boolean;
  savingEdit: boolean;
  savingPassword: boolean;
  onClose: () => void;
  onEditFromDetail: (usuario: UsuarioPlataforma) => void;
  onPasswordFromDetail: (usuario: UsuarioPlataforma) => void;
  onToggleActivo: (usuario: UsuarioPlataforma) => void;
  onCreateChange: (
    field: keyof CrearUsuarioPlataformaRequest,
    value: string,
  ) => void;
  onEditChange: (
    field: keyof ActualizarUsuarioPlataformaRequest,
    value: string,
  ) => void;
  onPasswordChange: (
    field: keyof CambiarClaveUsuarioPlataformaRequest,
    value: string,
  ) => void;
  onCreateSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onPasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const UsuarioPlataformaPanel = ({
  mode,
  selectedUsuario,
  changingStatus,
  createForm,
  editForm,
  passwordForm,
  savingCreate,
  savingEdit,
  savingPassword,
  onClose,
  onEditFromDetail,
  onPasswordFromDetail,
  onToggleActivo,
  onCreateChange,
  onEditChange,
  onPasswordChange,
  onCreateSubmit,
  onEditSubmit,
  onPasswordSubmit,
}: UsuarioPlataformaPanelProps) => {
  if (mode === "list") return null;

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-md)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-text)]">
            {mode === "create" && "Nuevo usuario"}
            {mode === "edit" && "Editar usuario"}
            {mode === "detail" && "Detalle de usuario"}
            {mode === "password" && "Cambiar clave"}
          </h3>

          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            {mode === "create" &&
              "Completa la información para registrar un nuevo usuario de plataforma."}
            {mode === "edit" &&
              "Actualiza los datos generales del usuario seleccionado."}
            {mode === "detail" &&
              "Consulta la información completa del usuario seleccionado."}
            {mode === "password" &&
              "Actualiza la clave del usuario seleccionado."}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text-soft)] transition hover:bg-[var(--color-card-hover)]"
        >
          Cerrar
        </button>
      </div>

      {mode === "detail" && selectedUsuario && (
        <UsuarioPlataformaDetailPanel
          usuario={selectedUsuario}
          changingStatus={changingStatus}
          onEditar={onEditFromDetail}
          onCambiarClave={onPasswordFromDetail}
          onToggleActivo={onToggleActivo}
        />
      )}

      {mode === "create" && (
        <UsuarioPlataformaCreateForm
          form={createForm}
          saving={savingCreate}
          onChange={onCreateChange}
          onCancel={onClose}
          onSubmit={onCreateSubmit}
        />
      )}

      {mode === "edit" && selectedUsuario && (
        <UsuarioPlataformaEditForm
          form={editForm}
          saving={savingEdit}
          onChange={onEditChange}
          onCancel={onClose}
          onSubmit={onEditSubmit}
        />
      )}

      {mode === "password" && selectedUsuario && (
        <CambiarClaveForm
          form={passwordForm}
          saving={savingPassword}
          onChange={onPasswordChange}
          onCancel={onClose}
          onSubmit={onPasswordSubmit}
        />
      )}
    </section>
  );
};
