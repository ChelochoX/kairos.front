import { useEffect, useState } from "react";
import { AlertMessage } from "../../../Shared/Components/ui/AlertMessage";
import { EmptyState } from "../../../Shared/Components/ui/EmptyState";
import { SectionCard } from "../../../Shared/Components/ui/SectionCard";
import { useEmpresas } from "../Hooks/useEmpresas";
import { empresaService } from "../Services/empresa.service";
import type {
  ActualizarEmpresaRequest,
  CrearEmpresaRequest,
  Empresa,
} from "../Types/empresa.types";
import { EmpresaCard } from "../Components/EmpresaCard";
import { EmpresaPanel } from "../Components/EmpresaPanel";
import { EmpresasHeader } from "../Components/EmpresasHeader";

type Mode = "list" | "detail" | "edit" | "create";

const createInitialForm = (): CrearEmpresaRequest => ({
  codigoEmpresa: "",
  nombreComercial: "",
  razonSocial: "",
  rubro: "",
  moneda: "",
  whatsAppContacto: "",
  emailContacto: "",
  logoPublicId: "",
  colorPrimario: "",
  colorSecundario: "",
});

const editInitialForm = (): ActualizarEmpresaRequest => ({
  nombreComercial: "",
  razonSocial: "",
  rubro: "",
  moneda: "",
  whatsAppContacto: "",
  emailContacto: "",
  logoPublicId: "",
  colorPrimario: "",
  colorSecundario: "",
});

export const EmpresasPage = () => {
  const { empresas, loading, error, filtroActiva, setFiltroActiva, recargar } =
    useEmpresas();

  const [mode, setMode] = useState<Mode>("list");
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

  const [createForm, setCreateForm] =
    useState<CrearEmpresaRequest>(createInitialForm());
  const [editForm, setEditForm] =
    useState<ActualizarEmpresaRequest>(editInitialForm());

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

  const openCreate = () => {
    setPanelError(null);
    setPanelSuccess(null);
    setSelectedEmpresa(null);
    setCreateForm(createInitialForm());
    setMode("create");
  };

  const openDetail = async (empresa: Empresa) => {
    setPanelError(null);
    setPanelSuccess(null);

    try {
      const detalle = await empresaService.getById(empresa.empresaId);
      setSelectedEmpresa(detalle);
      setMode("detail");
    } catch (err) {
      console.error("Error al obtener detalle:", err);
      setPanelError("No se pudo obtener el detalle de la empresa.");
    }
  };

  const openEdit = async (empresa: Empresa) => {
    setPanelError(null);
    setPanelSuccess(null);

    try {
      const detalle = await empresaService.getById(empresa.empresaId);

      setSelectedEmpresa(detalle);
      setEditForm({
        nombreComercial: detalle.nombreComercial ?? "",
        razonSocial: detalle.razonSocial ?? "",
        rubro: detalle.rubro ?? "",
        moneda: detalle.moneda ?? "",
        whatsAppContacto: detalle.whatsAppContacto ?? "",
        emailContacto: detalle.emailContacto ?? "",
        logoPublicId: detalle.logoPublicId ?? "",
        colorPrimario: detalle.colorPrimario ?? "",
        colorSecundario: detalle.colorSecundario ?? "",
      });

      setMode("edit");
    } catch (err) {
      console.error("Error al obtener empresa para edición:", err);
      setPanelError("No se pudo cargar la empresa para edición.");
    }
  };

  const closePanel = () => {
    setMode("list");
    setSelectedEmpresa(null);
    setPanelError(null);
  };

  const handleCreateChange = (
    field: keyof CrearEmpresaRequest,
    value: string,
  ) => {
    setCreateForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditChange = (
    field: keyof ActualizarEmpresaRequest,
    value: string,
  ) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSavingCreate(true);
      setPanelError(null);
      setPanelSuccess(null);

      await empresaService.create(createForm);
      await recargar();

      setCreateForm(createInitialForm());
      setMode("list");
      setPanelSuccess("Empresa creada correctamente.");
    } catch (err) {
      console.error("Error al crear empresa:", err);
      setPanelError("No se pudo crear la empresa.");
    } finally {
      setSavingCreate(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedEmpresa) return;

    try {
      setSavingEdit(true);
      setPanelError(null);
      setPanelSuccess(null);

      await empresaService.update(selectedEmpresa.empresaId, editForm);
      const detalleActualizado = await empresaService.getById(
        selectedEmpresa.empresaId,
      );

      setSelectedEmpresa(detalleActualizado);
      await recargar();

      setMode("detail");
      setPanelSuccess("Empresa actualizada correctamente.");
    } catch (err) {
      console.error("Error al actualizar empresa:", err);
      setPanelError("No se pudo actualizar la empresa.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleToggleActiva = async (empresa: Empresa) => {
    try {
      setChangingStatusId(empresa.empresaId);
      setPanelError(null);
      setPanelSuccess(null);

      await empresaService.setActiva(empresa.empresaId, !empresa.activa);
      await recargar();

      if (selectedEmpresa && selectedEmpresa.empresaId === empresa.empresaId) {
        const detalleActualizado = await empresaService.getById(
          empresa.empresaId,
        );
        setSelectedEmpresa(detalleActualizado);
      }

      setPanelSuccess(
        empresa.activa
          ? "Empresa desactivada correctamente."
          : "Empresa activada correctamente.",
      );
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      setPanelError("No se pudo cambiar el estado de la empresa.");
    } finally {
      setChangingStatusId(null);
    }
  };

  return (
    <div className="space-y-6">
      <EmpresasHeader
        filtroActiva={filtroActiva}
        onChangeFiltro={setFiltroActiva}
        onNuevaEmpresa={openCreate}
        onRecargar={() => void recargar()}
      />

      {panelSuccess && (
        <AlertMessage message={panelSuccess} variant="success" />
      )}

      {panelError && <AlertMessage message={panelError} variant="error" />}

      <SectionCard>
        {loading && (
          <AlertMessage message="Cargando empresas..." variant="info" />
        )}

        {!loading && error && <AlertMessage message={error} variant="error" />}

        {!loading && !error && empresas.length === 0 && (
          <EmptyState
            title="No hay empresas para mostrar"
            description="Todavía no existen empresas para el filtro seleccionado. Puedes crear una nueva empresa ahora mismo."
            actionLabel="Crear empresa"
            onAction={openCreate}
          />
        )}

        {!loading && !error && empresas.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {empresas.map((empresa) => (
              <EmpresaCard
                key={empresa.empresaId}
                empresa={empresa}
                changingStatus={changingStatusId === empresa.empresaId}
                onVerDetalle={(item) => void openDetail(item)}
                onEditar={(item) => void openEdit(item)}
                onToggleActiva={(item) => void handleToggleActiva(item)}
              />
            ))}
          </div>
        )}
      </SectionCard>

      <EmpresaPanel
        mode={mode}
        selectedEmpresa={selectedEmpresa}
        changingStatus={
          selectedEmpresa !== null &&
          changingStatusId === selectedEmpresa.empresaId
        }
        createForm={createForm}
        editForm={editForm}
        savingCreate={savingCreate}
        savingEdit={savingEdit}
        onClose={closePanel}
        onEditFromDetail={(empresa) => void openEdit(empresa)}
        onToggleActiva={(empresa) => void handleToggleActiva(empresa)}
        onCreateChange={handleCreateChange}
        onEditChange={handleEditChange}
        onCreateSubmit={handleCreateSubmit}
        onEditSubmit={handleEditSubmit}
      />
    </div>
  );
};
