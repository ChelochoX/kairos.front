import { useEffect, useMemo, useState } from "react";
import { AlertMessage } from "../../../Shared/Components/ui/AlertMessage";
import { EmptyState } from "../../../Shared/Components/ui/EmptyState";
import { SectionCard } from "../../../Shared/Components/ui/SectionCard";
import { ModuloEmpresaCard } from "../Components/ModuloEmpresaCard";
import { ModuloEmpresaPanel } from "../Components/ModuloEmpresaPanel";
import { ModulosEmpresaHeader } from "../Components/ModulosEmpresaHeader";
import { useModulosEmpresa } from "../Hooks/useModulosEmpresa";
import { moduloEmpresaService } from "../Services/modulo-empresa.service";
import { moduloCatalogoService } from "../../ModulosCatalogo/Services/modulo-catalogo.service";
import { empresaService } from "../../Empresas/Services/empresa.service";
import type { Empresa } from "../../Empresas/Types/empresa.types";
import type {
  AsignarModuloEmpresaRequest,
  ModuloCatalogoOption,
  ModuloEmpresa,
} from "../Types/modulo-empresa.types";

type Mode = "list" | "detail" | "create";

const createInitialForm = (): AsignarModuloEmpresaRequest => ({
  moduloId: 0,
});

export const ModulosEmpresaPage = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaId, setEmpresaId] = useState<number | null>(null);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);

  const { modulos, loading, error, recargar } = useModulosEmpresa(empresaId);

  const [mode, setMode] = useState<Mode>("list");
  const [selectedModulo, setSelectedModulo] = useState<ModuloEmpresa | null>(
    null,
  );

  const [createForm, setCreateForm] =
    useState<AsignarModuloEmpresaRequest>(createInitialForm());

  const [opciones, setOpciones] = useState<ModuloCatalogoOption[]>([]);
  const [loadingOpciones, setLoadingOpciones] = useState(false);

  const [savingCreate, setSavingCreate] = useState(false);
  const [changingStatusId, setChangingStatusId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [panelError, setPanelError] = useState<string | null>(null);
  const [panelSuccess, setPanelSuccess] = useState<string | null>(null);

  useEffect(() => {
    const cargarEmpresas = async () => {
      try {
        setLoadingEmpresas(true);
        const data = await empresaService.getAll(true);
        setEmpresas(data);

        if (data.length > 0) {
          setEmpresaId(data[0].empresaId);
        }
      } catch (error) {
        console.error("Error al cargar empresas:", error);
        setPanelError("No se pudieron cargar las empresas.");
      } finally {
        setLoadingEmpresas(false);
      }
    };

    void cargarEmpresas();
  }, []);

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

  const opcionesDisponibles = useMemo(() => {
    const yaAsignados = new Set(modulos.map((m) => m.moduloId));
    return opciones.filter((x) => !yaAsignados.has(x.moduloId));
  }, [opciones, modulos]);

  const openCreate = async () => {
    if (!empresaId) {
      showPanelError("Debes seleccionar una empresa.");
      return;
    }

    clearPanelMessages();
    setSelectedModulo(null);
    setCreateForm(createInitialForm());

    try {
      setLoadingOpciones(true);

      const catalogo = await moduloCatalogoService.getAll(true);
      setOpciones(
        catalogo.map((m) => ({
          moduloId: m.moduloId,
          codigoModulo: m.codigoModulo,
          nombre: m.nombre,
          descripcion: m.descripcion,
          activo: m.activo,
        })),
      );

      setMode("create");
    } catch (error) {
      console.error("Error al cargar catálogo de módulos:", error);
      showPanelError("No se pudieron cargar los módulos disponibles.");
    } finally {
      setLoadingOpciones(false);
    }
  };

  const openDetail = async (modulo: ModuloEmpresa) => {
    if (!empresaId) return;

    clearPanelMessages();

    try {
      const detalle = await moduloEmpresaService.getById(
        empresaId,
        modulo.moduloEmpresaId,
      );
      setSelectedModulo(detalle);
      setMode("detail");
    } catch (error) {
      console.error("Error al obtener detalle:", error);
      showPanelError("No se pudo obtener el detalle de la asignación.");
    }
  };

  const closePanel = () => {
    setMode("list");
    setSelectedModulo(null);
    setPanelError(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!empresaId) {
      showPanelError("Debes seleccionar una empresa.");
      return;
    }

    if (!createForm.moduloId) {
      showPanelError("Debes seleccionar un módulo.");
      return;
    }

    try {
      setSavingCreate(true);
      clearPanelMessages();

      await moduloEmpresaService.create(empresaId, createForm);
      await recargar();

      setCreateForm(createInitialForm());
      setMode("list");
      showPanelSuccess("Módulo asignado a la empresa correctamente.");
    } catch (error) {
      console.error("Error al asignar módulo:", error);
      showPanelError("No se pudo asignar el módulo a la empresa.");
    } finally {
      setSavingCreate(false);
    }
  };

  const handleToggleActivo = async (modulo: ModuloEmpresa) => {
    if (!empresaId) return;

    try {
      setChangingStatusId(modulo.moduloEmpresaId);
      clearPanelMessages();

      await moduloEmpresaService.setActivo(
        empresaId,
        modulo.moduloEmpresaId,
        !modulo.activo,
      );

      await recargar();

      if (
        selectedModulo &&
        selectedModulo.moduloEmpresaId === modulo.moduloEmpresaId
      ) {
        const detalleActualizado = await moduloEmpresaService.getById(
          empresaId,
          modulo.moduloEmpresaId,
        );
        setSelectedModulo(detalleActualizado);
      }

      showPanelSuccess(
        modulo.activo
          ? "Módulo de empresa desactivado correctamente."
          : "Módulo de empresa activado correctamente.",
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      showPanelError("No se pudo cambiar el estado del módulo de empresa.");
    } finally {
      setChangingStatusId(null);
    }
  };

  const handleEliminar = async (modulo: ModuloEmpresa) => {
    if (!empresaId) return;

    try {
      setDeletingId(modulo.moduloEmpresaId);
      clearPanelMessages();

      await moduloEmpresaService.delete(empresaId, modulo.moduloEmpresaId);
      await recargar();

      if (
        selectedModulo &&
        selectedModulo.moduloEmpresaId === modulo.moduloEmpresaId
      ) {
        setSelectedModulo(null);
        setMode("list");
      }

      showPanelSuccess("Asignación de módulo eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar asignación:", error);
      showPanelError("No se pudo eliminar la asignación del módulo.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <ModulosEmpresaHeader
        onNuevaAsignacion={() => void openCreate()}
        onRecargar={() => void recargar()}
      />

      <SectionCard>
        <div className="grid gap-4 md:grid-cols-[240px_1fr] md:items-end">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">
              Empresa
            </label>

            <select
              value={empresaId ?? ""}
              onChange={(e) => setEmpresaId(Number(e.target.value))}
              disabled={loadingEmpresas}
              className="w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)] disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="">
                {loadingEmpresas
                  ? "Cargando empresas..."
                  : "Seleccionar empresa"}
              </option>

              {empresas.map((empresa) => (
                <option key={empresa.empresaId} value={empresa.empresaId}>
                  {empresa.nombreComercial ||
                    empresa.razonSocial ||
                    `Empresa ${empresa.empresaId}`}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-[var(--color-text-soft)]">
            Selecciona una empresa para visualizar y administrar sus módulos
            asignados.
          </p>
        </div>
      </SectionCard>

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
              message="Cargando módulos de la empresa..."
              variant="info"
            />
          )}

          {!loading && error && (
            <AlertMessage message={error} variant="error" />
          )}

          {!loading && !error && empresaId && modulos.length === 0 && (
            <EmptyState
              title="No hay módulos asignados"
              description="La empresa seleccionada todavía no tiene módulos habilitados."
              actionLabel="Asignar módulo"
              onAction={() => void openCreate()}
            />
          )}

          {!loading && !error && modulos.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {modulos.map((modulo) => (
                <ModuloEmpresaCard
                  key={modulo.moduloEmpresaId}
                  modulo={modulo}
                  changingStatus={changingStatusId === modulo.moduloEmpresaId}
                  deleting={deletingId === modulo.moduloEmpresaId}
                  onVerDetalle={(item) => void openDetail(item)}
                  onToggleActivo={(item) => void handleToggleActivo(item)}
                  onEliminar={(item) => void handleEliminar(item)}
                />
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      <ModuloEmpresaPanel
        mode={mode}
        selectedModulo={selectedModulo}
        createForm={createForm}
        opciones={opcionesDisponibles}
        loadingOpciones={loadingOpciones}
        savingCreate={savingCreate}
        changingStatus={changingStatusId === selectedModulo?.moduloEmpresaId}
        deleting={deletingId === selectedModulo?.moduloEmpresaId}
        onClose={closePanel}
        onToggleActivo={(modulo) => void handleToggleActivo(modulo)}
        onEliminar={(modulo) => void handleEliminar(modulo)}
        onCreateChange={(field, value) =>
          setCreateForm((prev) => ({ ...prev, [field]: value }))
        }
        onCreateSubmit={handleCreateSubmit}
      />
    </div>
  );
};
