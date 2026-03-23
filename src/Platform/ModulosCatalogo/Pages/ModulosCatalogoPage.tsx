import { useEffect, useState } from "react";
import { AlertMessage } from "../../../Shared/Components/ui/AlertMessage";
import { EmptyState } from "../../../Shared/Components/ui/EmptyState";
import { SectionCard } from "../../../Shared/Components/ui/SectionCard";
import { ModuloCatalogoCard } from "../Components/ModuloCatalogoCard";
import { ModuloCatalogoPanel } from "../Components/ModuloCatalogoPanel";
import { ModulosCatalogoHeader } from "../Components/ModulosCatalogoHeader";
import { useModulosCatalogo } from "../Hooks/useModulosCatalogo";
import { moduloCatalogoService } from "../Services/modulo-catalogo.service";
import type {
  ActualizarModuloCatalogoRequest,
  CrearModuloCatalogoRequest,
  ModuloCatalogo,
} from "../Types/modulo-catalogo.types";

type Mode = "list" | "detail" | "create" | "edit";

const createInitialForm = (): CrearModuloCatalogoRequest => ({
  codigoModulo: "",
  nombre: "",
  descripcion: "",
});

const editInitialForm = (): ActualizarModuloCatalogoRequest => ({
  codigoModulo: "",
  nombre: "",
  descripcion: "",
});

export const ModulosCatalogoPage = () => {
  const { modulos, loading, error, filtroActivo, setFiltroActivo, recargar } =
    useModulosCatalogo();

  const [mode, setMode] = useState<Mode>("list");
  const [selectedModulo, setSelectedModulo] = useState<ModuloCatalogo | null>(
    null,
  );

  const [createForm, setCreateForm] =
    useState<CrearModuloCatalogoRequest>(createInitialForm());
  const [editForm, setEditForm] =
    useState<ActualizarModuloCatalogoRequest>(editInitialForm());

  const [savingCreate, setSavingCreate] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [changingStatusId, setChangingStatusId] = useState<number | null>(null);

  const [panelError, setPanelError] = useState<string | null>(null);
  const [panelSuccess, setPanelSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!panelSuccess) return;

    const timeout = setTimeout(() => {
      setPanelSuccess(null);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [panelSuccess]);

  useEffect(() => {
    if (!panelError) return;

    const timeout = setTimeout(() => {
      setPanelError(null);
    }, 4500);

    return () => clearTimeout(timeout);
  }, [panelError]);

  const clearPanelMessages = () => {
    setPanelError(null);
    setPanelSuccess(null);
  };

  const showPanelError = (message: string) => {
    setPanelSuccess(null);
    setPanelError(message);
  };

  const showPanelSuccess = (message: string) => {
    setPanelError(null);
    setPanelSuccess(message);
  };

  const openCreate = () => {
    clearPanelMessages();
    setSelectedModulo(null);
    setCreateForm(createInitialForm());
    setMode("create");
  };

  const openDetail = async (modulo: ModuloCatalogo) => {
    clearPanelMessages();

    try {
      const detalle = await moduloCatalogoService.getById(modulo.moduloId);
      setSelectedModulo(detalle);
      setMode("detail");
    } catch (error) {
      console.error("Error al obtener detalle del módulo:", error);
      showPanelError("No se pudo obtener el detalle del módulo.");
    }
  };

  const openEdit = async (modulo: ModuloCatalogo) => {
    clearPanelMessages();

    try {
      const detalle = await moduloCatalogoService.getById(modulo.moduloId);

      setSelectedModulo(detalle);
      setEditForm({
        codigoModulo: detalle.codigoModulo ?? "",
        nombre: detalle.nombre ?? "",
        descripcion: detalle.descripcion ?? "",
      });
      setMode("edit");
    } catch (error) {
      console.error("Error al obtener módulo para edición:", error);
      showPanelError("No se pudo cargar el módulo para edición.");
    }
  };

  const closePanel = () => {
    setMode("list");
    setSelectedModulo(null);
    setPanelError(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSavingCreate(true);
      clearPanelMessages();

      await moduloCatalogoService.create(createForm);
      await recargar();

      setCreateForm(createInitialForm());
      setMode("list");
      showPanelSuccess("Módulo del catálogo creado correctamente.");
    } catch (error) {
      console.error("Error al crear módulo:", error);
      showPanelError("No se pudo crear el módulo del catálogo.");
    } finally {
      setSavingCreate(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedModulo) return;

    try {
      setSavingEdit(true);
      clearPanelMessages();

      await moduloCatalogoService.update(selectedModulo.moduloId, editForm);

      const detalleActualizado = await moduloCatalogoService.getById(
        selectedModulo.moduloId,
      );

      setSelectedModulo(detalleActualizado);
      await recargar();
      setMode("detail");
      showPanelSuccess("Módulo del catálogo actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar módulo:", error);
      showPanelError("No se pudo actualizar el módulo del catálogo.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleToggleActivo = async (modulo: ModuloCatalogo) => {
    try {
      setChangingStatusId(modulo.moduloId);
      clearPanelMessages();

      await moduloCatalogoService.setActivo(modulo.moduloId, !modulo.activo);
      await recargar();

      if (selectedModulo && selectedModulo.moduloId === modulo.moduloId) {
        const detalleActualizado = await moduloCatalogoService.getById(
          modulo.moduloId,
        );
        setSelectedModulo(detalleActualizado);
      }

      showPanelSuccess(
        modulo.activo
          ? "Módulo desactivado correctamente."
          : "Módulo activado correctamente.",
      );
    } catch (error) {
      console.error("Error al cambiar estado del módulo:", error);
      showPanelError("No se pudo cambiar el estado del módulo.");
    } finally {
      setChangingStatusId(null);
    }
  };

  return (
    <div className="space-y-6">
      <ModulosCatalogoHeader
        filtroActivo={filtroActivo}
        onChangeFiltro={setFiltroActivo}
        onNuevoModulo={openCreate}
        onRecargar={() => void recargar()}
      />

      <div className="space-y-3">
        {panelSuccess && (
          <AlertMessage
            message={panelSuccess}
            variant="success"
            onClose={() => setPanelSuccess(null)}
          />
        )}

        {panelError && (
          <AlertMessage
            message={panelError}
            variant="error"
            onClose={() => setPanelError(null)}
          />
        )}
      </div>

      <SectionCard>
        <div className="space-y-4">
          {loading && (
            <AlertMessage
              message="Cargando módulos del catálogo..."
              variant="info"
            />
          )}

          {!loading && error && (
            <AlertMessage message={error} variant="error" />
          )}

          {!loading && !error && modulos.length === 0 && (
            <EmptyState
              title="No hay módulos para mostrar"
              description="Todavía no existen módulos del catálogo para el filtro seleccionado."
              actionLabel="Crear módulo"
              onAction={openCreate}
            />
          )}

          {!loading && !error && modulos.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {modulos.map((modulo) => (
                <ModuloCatalogoCard
                  key={modulo.moduloId}
                  modulo={modulo}
                  changingStatus={changingStatusId === modulo.moduloId}
                  onVerDetalle={(item) => void openDetail(item)}
                  onEditar={(item) => void openEdit(item)}
                  onToggleActivo={(item) => void handleToggleActivo(item)}
                />
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      <ModuloCatalogoPanel
        mode={mode}
        selectedModulo={selectedModulo}
        changingStatus={changingStatusId === selectedModulo?.moduloId}
        createForm={createForm}
        editForm={editForm}
        savingCreate={savingCreate}
        savingEdit={savingEdit}
        onClose={closePanel}
        onEditFromDetail={(modulo) => void openEdit(modulo)}
        onToggleActivo={(modulo) => void handleToggleActivo(modulo)}
        onCreateChange={(field, value) =>
          setCreateForm((prev) => ({ ...prev, [field]: value }))
        }
        onEditChange={(field, value) =>
          setEditForm((prev) => ({ ...prev, [field]: value }))
        }
        onCreateSubmit={handleCreateSubmit}
        onEditSubmit={handleEditSubmit}
      />
    </div>
  );
};
