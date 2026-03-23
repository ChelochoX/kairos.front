import { SectionCard } from "../../../Shared/Components/ui/SectionCard";
import { AsignarModuloEmpresaForm } from "./AsignarModuloEmpresaForm";
import { ModuloEmpresaDetailPanel } from "./ModuloEmpresaDetailPanel";
import type {
  AsignarModuloEmpresaRequest,
  ModuloCatalogoOption,
  ModuloEmpresa,
} from "../Types/modulo-empresa.types";

interface ModuloEmpresaPanelProps {
  mode: "list" | "detail" | "create";
  selectedModulo: ModuloEmpresa | null;
  createForm: AsignarModuloEmpresaRequest;
  opciones: ModuloCatalogoOption[];
  loadingOpciones: boolean;
  savingCreate: boolean;
  changingStatus: boolean;
  deleting: boolean;
  onClose: () => void;
  onToggleActivo: (modulo: ModuloEmpresa) => void;
  onEliminar: (modulo: ModuloEmpresa) => void;
  onCreateChange: (
    field: keyof AsignarModuloEmpresaRequest,
    value: number,
  ) => void;
  onCreateSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const getPanelTitle = (
  mode: ModuloEmpresaPanelProps["mode"],
): string | null => {
  switch (mode) {
    case "create":
      return "Asignar módulo";
    case "detail":
      return "Detalle de asignación";
    default:
      return null;
  }
};

const getPanelDescription = (
  mode: ModuloEmpresaPanelProps["mode"],
): string | null => {
  switch (mode) {
    case "create":
      return "Selecciona un módulo del catálogo para asignarlo a la empresa.";
    case "detail":
      return "Consulta la asignación del módulo y gestiona su estado.";
    default:
      return null;
  }
};

export const ModuloEmpresaPanel = ({
  mode,
  selectedModulo,
  createForm,
  opciones,
  loadingOpciones,
  savingCreate,
  changingStatus,
  deleting,
  onClose,
  onToggleActivo,
  onEliminar,
  onCreateChange,
  onCreateSubmit,
}: ModuloEmpresaPanelProps) => {
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
          <AsignarModuloEmpresaForm
            form={createForm}
            opciones={opciones}
            loadingOpciones={loadingOpciones}
            saving={savingCreate}
            onChange={onCreateChange}
            onCancel={onClose}
            onSubmit={onCreateSubmit}
          />
        )}

        {mode === "detail" && selectedModulo && (
          <ModuloEmpresaDetailPanel
            modulo={selectedModulo}
            changingStatus={changingStatus}
            deleting={deleting}
            onToggleActivo={onToggleActivo}
            onEliminar={onEliminar}
          />
        )}
      </div>
    </SectionCard>
  );
};
