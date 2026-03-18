import { EmpresaCreateForm } from "./EmpresaCreateForm";
import { EmpresaDetailPanel } from "./EmpresaDetailPanel";
import { EmpresaEditForm } from "./EmpresaEditForm";
import type {
  ActualizarEmpresaRequest,
  CrearEmpresaRequest,
  Empresa,
} from "../Types/empresa.types";

type Mode = "list" | "detail" | "edit" | "create";

interface EmpresaPanelProps {
  mode: Mode;
  selectedEmpresa: Empresa | null;
  changingStatus: boolean;
  createForm: CrearEmpresaRequest;
  editForm: ActualizarEmpresaRequest;
  savingCreate: boolean;
  savingEdit: boolean;
  onClose: () => void;
  onEditFromDetail: (empresa: Empresa) => void;
  onToggleActiva: (empresa: Empresa) => void;
  onCreateChange: (field: keyof CrearEmpresaRequest, value: string) => void;
  onEditChange: (field: keyof ActualizarEmpresaRequest, value: string) => void;
  onCreateSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const EmpresaPanel = ({
  mode,
  selectedEmpresa,
  changingStatus,
  createForm,
  editForm,
  savingCreate,
  savingEdit,
  onClose,
  onEditFromDetail,
  onToggleActiva,
  onCreateChange,
  onEditChange,
  onCreateSubmit,
  onEditSubmit,
}: EmpresaPanelProps) => {
  if (mode === "list") return null;

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-md)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-text)]">
            {mode === "create" && "Nueva empresa"}
            {mode === "edit" && "Editar empresa"}
            {mode === "detail" && "Detalle de empresa"}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            {mode === "create" &&
              "Completa la información para registrar una nueva empresa."}
            {mode === "edit" &&
              "Actualiza los datos generales y visuales de la empresa seleccionada."}
            {mode === "detail" &&
              "Consulta la información completa de la empresa seleccionada."}
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

      {mode === "detail" && selectedEmpresa && (
        <EmpresaDetailPanel
          empresa={selectedEmpresa}
          changingStatus={changingStatus}
          onEditar={onEditFromDetail}
          onToggleActiva={onToggleActiva}
        />
      )}

      {mode === "create" && (
        <EmpresaCreateForm
          form={createForm}
          saving={savingCreate}
          onChange={onCreateChange}
          onCancel={onClose}
          onSubmit={onCreateSubmit}
        />
      )}

      {mode === "edit" && selectedEmpresa && (
        <EmpresaEditForm
          form={editForm}
          saving={savingEdit}
          onChange={onEditChange}
          onCancel={onClose}
          onSubmit={onEditSubmit}
        />
      )}
    </section>
  );
};
