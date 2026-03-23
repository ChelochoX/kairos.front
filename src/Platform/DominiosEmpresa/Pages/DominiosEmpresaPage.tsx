import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { ArrowLeft, Globe, Plus, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

import { AlertMessage } from "../../../Shared/Components/ui/AlertMessage";
import { DominioEmpresaFormModal } from "../Components/DominioEmpresaFormModal";
import { DominiosEmpresaTable } from "../Components/DominiosEmpresaTable";
import { useDominiosEmpresa } from "../Hooks/useDominiosEmpresa";
import { useEmpresas } from "../../Empresas/Hooks/useEmpresas";
import { PageTitle } from "../../../Shared/Components/ui/PageTitle";

import type {
  DominioEmpresa,
  DominioEmpresaFormValues,
} from "../Types/dominioEmpresa.types";

type FeedbackState = {
  type: "success" | "error" | "info" | "warning";
  message: string;
} | null;

export const DominiosEmpresaPage = () => {
  const {
    empresas,
    loading: loadingEmpresas,
    error: errorEmpresas,
  } = useEmpresas();

  const [empresaId, setEmpresaId] = useState<number | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DominioEmpresa | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const empresaSeleccionada = useMemo(
    () => empresas.find((x) => x.empresaId === empresaId) ?? null,
    [empresas, empresaId],
  );

  const {
    dominios,
    loading,
    submitting,
    error,
    crear,
    actualizar,
    cambiarActivo,
    cambiarPrincipal,
    eliminar,
    recargar,
  } = useDominiosEmpresa(empresaId);

  const handleEmpresaChange = (value: string) => {
    const parsed = Number(value);
    setEmpresaId(Number.isFinite(parsed) && parsed > 0 ? parsed : undefined);
    setFeedback(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: DominioEmpresa) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleRefresh = async () => {
    try {
      await recargar();
      setFeedback({
        type: "info",
        message: "Listado de dominios actualizado correctamente.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "No se pudo actualizar el listado de dominios.",
      });
    }
  };

  const handleSubmit = async (values: DominioEmpresaFormValues) => {
    try {
      if (editingItem) {
        await actualizar(editingItem.dominioEmpresaId, values);
        setFeedback({
          type: "success",
          message: "Dominio actualizado correctamente.",
        });
      } else {
        await crear(values);
        setFeedback({
          type: "success",
          message: "Dominio creado correctamente.",
        });
      }

      closeModal();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo guardar el dominio.";

      setFeedback({
        type: "error",
        message,
      });
    }
  };

  const handleToggleActivo = async (item: DominioEmpresa) => {
    const nextValue = !item.activo;

    const result = await Swal.fire({
      icon: "question",
      title: nextValue ? "¿Activar dominio?" : "¿Desactivar dominio?",
      text: `Se ${nextValue ? "activará" : "desactivará"} el dominio ${item.dominio}.`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#4f46e5",
    });

    if (!result.isConfirmed) return;

    try {
      await cambiarActivo(item.dominioEmpresaId, nextValue);
      setFeedback({
        type: "success",
        message: nextValue
          ? "Dominio activado correctamente."
          : "Dominio desactivado correctamente.",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo actualizar el estado.";

      setFeedback({
        type: "error",
        message,
      });
    }
  };

  const handleTogglePrincipal = async (item: DominioEmpresa) => {
    const nextValue = !item.esPrincipal;

    const result = await Swal.fire({
      icon: "question",
      title: nextValue
        ? "¿Definir como principal?"
        : "¿Quitar dominio principal?",
      text: nextValue
        ? `El dominio ${item.dominio} pasará a ser el principal de la empresa.`
        : `El dominio ${item.dominio} dejará de ser principal.`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#4f46e5",
    });

    if (!result.isConfirmed) return;

    try {
      await cambiarPrincipal(item.dominioEmpresaId, nextValue);
      setFeedback({
        type: "success",
        message: nextValue
          ? "Dominio principal actualizado correctamente."
          : "El dominio dejó de ser principal correctamente.",
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudo actualizar el dominio principal.";

      setFeedback({
        type: "error",
        message,
      });
    }
  };

  const handleDelete = async (item: DominioEmpresa) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar dominio?",
      text: `Se eliminará el dominio ${item.dominio}. Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await eliminar(item.dominioEmpresaId);
      setFeedback({
        type: "success",
        message: "Dominio eliminado correctamente.",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo eliminar el dominio.";

      setFeedback({
        type: "error",
        message,
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] bg-gradient-to-r from-[#5B5CF6] via-[#3527B7] to-[#020B3F] px-5 py-6 text-white shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-white/85 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Volver al dashboard
            </Link>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <Globe size={22} />
              </div>

              <div>
                <PageTitle>Dominios Empresa</PageTitle>
                <p className="mt-2 text-sm text-white/80">
                  Administra los dominios configurados por empresa.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void handleRefresh()}
              disabled={!empresaId || loading || submitting}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={16} />
              Recargar
            </button>

            <button
              type="button"
              onClick={handleOpenCreate}
              disabled={!empresaId || submitting}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={16} />
              Nuevo dominio
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="w-full max-w-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Empresa
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
              value={empresaId ?? ""}
              onChange={(e) => handleEmpresaChange(e.target.value)}
              disabled={loadingEmpresas}
            >
              <option value="">Seleccione una empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.empresaId} value={empresa.empresaId}>
                  {empresa.nombreComercial}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-slate-500 lg:pt-7">
            {empresaSeleccionada
              ? `Visualizando dominios de ${empresaSeleccionada.nombreComercial}.`
              : "Selecciona una empresa para visualizar y administrar sus dominios configurados."}
          </div>
        </div>
      </div>

      {errorEmpresas && (
        <AlertMessage
          variant="error"
          message={errorEmpresas}
          onClose={() => setFeedback(null)}
        />
      )}

      {feedback && (
        <AlertMessage
          variant={feedback.type}
          message={feedback.message}
          onClose={() => setFeedback(null)}
        />
      )}

      {error && !feedback && (
        <AlertMessage
          variant="error"
          message={error}
          onClose={() => setFeedback(null)}
        />
      )}

      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        {!empresaId ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <h3 className="text-2xl font-bold text-slate-800">
              Seleccione una empresa
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              Selecciona una empresa para ver y administrar sus dominios.
            </p>
          </div>
        ) : (
          <DominiosEmpresaTable
            data={dominios}
            loading={loading}
            actionLoading={submitting}
            error={null}
            onEdit={handleOpenEdit}
            onToggleActivo={handleToggleActivo}
            onTogglePrincipal={handleTogglePrincipal}
            onDelete={handleDelete}
            onCreate={handleOpenCreate}
          />
        )}
      </div>

      <DominioEmpresaFormModal
        open={modalOpen}
        mode={editingItem ? "edit" : "create"}
        initialData={editingItem}
        loading={submitting}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
