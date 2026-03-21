import { SectionCard } from "../../../Shared/Components/ui/SectionCard";
import { UsuarioPlataformaCreateForm } from "./UsuarioPlataformaCreateForm";
import { UsuarioPlataformaDetailPanel } from "./UsuarioPlataformaDetailPanel";
import { UsuarioPlataformaEditForm } from "./UsuarioPlataformaEditForm";
import { CambiarClaveForm } from "./CambiarClaveForm";
import type {
  ActualizarUsuarioPlataformaRequest,
  CambiarClaveUsuarioPlataformaRequest,
  CrearUsuarioPlataformaRequest,
  RolPlataforma,
  UsuarioPlataforma,
} from "../Types/usuario-plataforma.types";

interface UsuarioPlataformaPanelProps {
  mode: "list" | "detail" | "create" | "edit" | "password";
  selectedUsuario: UsuarioPlataforma | null;
  changingStatus: boolean;
  createForm: CrearUsuarioPlataformaRequest;
  editForm: ActualizarUsuarioPlataformaRequest;
  passwordForm: CambiarClaveUsuarioPlataformaRequest;
  roles: RolPlataforma[];
  loadingRoles: boolean;
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

const getPanelTitle = (
  mode: UsuarioPlataformaPanelProps["mode"],
): string | null => {
  switch (mode) {
    case "create":
      return "Nuevo usuario";
    case "edit":
      return "Editar usuario";
    case "detail":
      return "Detalle del usuario";
    case "password":
      return "Cambiar clave";
    default:
      return null;
  }
};

const getPanelDescription = (
  mode: UsuarioPlataformaPanelProps["mode"],
): string | null => {
  switch (mode) {
    case "create":
      return "Completa la información para registrar un nuevo usuario de plataforma.";
    case "edit":
      return "Actualiza la información principal del usuario de plataforma.";
    case "detail":
      return "Consulta los datos del usuario y gestiona sus acciones disponibles.";
    case "password":
      return "Define una nueva clave para el usuario seleccionado.";
    default:
      return null;
  }
};

export const UsuarioPlataformaPanel = ({
  mode,
  selectedUsuario,
  changingStatus,
  createForm,
  editForm,
  passwordForm,
  roles,
  loadingRoles,
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

  const title = getPanelTitle(mode);
  const description = getPanelDescription(mode);

  return (
    <SectionCard>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text)]">
              {title}
            </h2>

            {description && (
              <p className="text-sm text-[var(--color-text-soft)]">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-card-hover)]"
          >
            Cerrar
          </button>
        </div>

        {mode === "create" && (
          <UsuarioPlataformaCreateForm
            form={createForm}
            roles={roles}
            loadingRoles={loadingRoles}
            saving={savingCreate}
            onChange={onCreateChange}
            onCancel={onClose}
            onSubmit={onCreateSubmit}
          />
        )}

        {mode === "edit" && (
          <UsuarioPlataformaEditForm
            form={editForm}
            roles={roles}
            loadingRoles={loadingRoles}
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

        {mode === "detail" && selectedUsuario && (
          <UsuarioPlataformaDetailPanel
            usuario={selectedUsuario}
            changingStatus={changingStatus}
            onEditar={onEditFromDetail}
            onCambiarClave={onPasswordFromDetail}
            onToggleActivo={onToggleActivo}
          />
        )}
      </div>
    </SectionCard>
  );
};
