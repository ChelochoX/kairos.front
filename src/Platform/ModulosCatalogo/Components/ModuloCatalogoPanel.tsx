import { SectionCard } from "../../../Shared/Components/ui/SectionCard";
import { ModuloCatalogoCreateForm } from "./ModuloCatalogoCreateForm";
import { ModuloCatalogoDetailPanel } from "./ModuloCatalogoDetailPanel";
import { ModuloCatalogoEditForm } from "./ModuloCatalogoEditForm";
import type {
  ActualizarModuloCatalogoRequest,
  CrearModuloCatalogoRequest,
  ModuloCatalogo,
} from "../Types/modulo-catalogo.types";

interface ModuloCatalogoPanelProps {
  mode: "list" | "detail" | "create" | "edit";
  selectedModulo: ModuloCatalogo | null;
  changingStatus: boolean;
  createForm: CrearModuloCatalogoRequest;
  editForm: ActualizarModuloCatalogoRequest;
  savingCreate: boolean;
  savingEdit: boolean;
  onClose: () => void;
  onEditFromDetail: (modulo: ModuloCatalogo) => void;
  onToggleActivo: (modulo: ModuloCatalogo) => void;
  onCreateChange: (
    field: keyof CrearModuloCatalogoRequest,
    value: string,
  ) => void;
  onEditChange: (
    field: keyof ActualizarModuloCatalogoRequest,
    value: string,
  ) => void;
  onCreateSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const getPanelTitle = (
  mode: ModuloCatalogoPanelProps["mode"],
): string | null => {
  switch (mode) {
    case "create":
      return "Nuevo módulo";
    case "edit":
      return "Editar módulo";
    case "detail":
      return "Detalle del módulo";
    default:
      return null;
  }
};

const getPanelDescription = (
  mode: ModuloCatalogoPanelProps["mode"],
): string | null => {
  switch (mode) {
    case "create":
      return "Completa la información para registrar un nuevo módulo del catálogo.";
    case "edit":
      return "Actualiza la información principal del módulo del catálogo.";
    case "detail":
      return "Consulta los datos del módulo y gestiona sus acciones disponibles.";
    default:
      return null;
  }
};

export const ModuloCatalogoPanel = ({
  mode,
  selectedModulo,
  changingStatus,
  createForm,
  editForm,
  savingCreate,
  savingEdit,
  onClose,
  onEditFromDetail,
  onToggleActivo,
  onCreateChange,
  onEditChange,
  onCreateSubmit,
  onEditSubmit,
}: ModuloCatalogoPanelProps) => {
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
          <ModuloCatalogoCreateForm
            form={createForm}
            saving={savingCreate}
            onChange={onCreateChange}
            onCancel={onClose}
            onSubmit={onCreateSubmit}
          />
        )}

        {mode === "edit" && (
          <ModuloCatalogoEditForm
            form={editForm}
            saving={savingEdit}
            onChange={onEditChange}
            onCancel={onClose}
            onSubmit={onEditSubmit}
          />
        )}

        {mode === "detail" && selectedModulo && (
          <ModuloCatalogoDetailPanel
            modulo={selectedModulo}
            changingStatus={changingStatus}
            onEditar={onEditFromDetail}
            onToggleActivo={onToggleActivo}
          />
        )}
      </div>
    </SectionCard>
  );
};
