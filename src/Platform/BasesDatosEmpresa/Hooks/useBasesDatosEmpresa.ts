import { useCallback, useEffect, useState } from "react";
import { basesDatosEmpresaService } from "../Services/basesDatosEmpresaService";
import type {
  ActualizarBaseDatosEmpresaRequest,
  BaseDatosEmpresa,
  CrearBaseDatosEmpresaRequest,
} from "../Types/baseDatosEmpresa.types";

export const useBasesDatosEmpresa = (empresaId?: number) => {
  const [basesDatos, setBasesDatos] = useState<BaseDatosEmpresa[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    if (!empresaId) {
      setBasesDatos([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await basesDatosEmpresaService.getAll(empresaId);
      setBasesDatos(data);
    } catch (err) {
      console.error("Error al cargar bases de datos:", err);
      setError("No se pudieron cargar las bases de datos.");
      setBasesDatos([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void recargar();
  }, [recargar]);

  const crear = async (payload: CrearBaseDatosEmpresaRequest) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await basesDatosEmpresaService.create(empresaId, payload);
      await recargar();
    } catch (err) {
      console.error("Error al crear base de datos:", err);
      setError("No se pudo crear la base de datos.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const actualizar = async (
    baseDatosEmpresaId: number,
    payload: ActualizarBaseDatosEmpresaRequest,
  ) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await basesDatosEmpresaService.update(
        empresaId,
        baseDatosEmpresaId,
        payload,
      );
      await recargar();
    } catch (err) {
      console.error("Error al actualizar base de datos:", err);
      setError("No se pudo actualizar la base de datos.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const cambiarActivo = async (baseDatosEmpresaId: number, activo: boolean) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await basesDatosEmpresaService.setActivo(
        empresaId,
        baseDatosEmpresaId,
        activo,
      );
      await recargar();
    } catch (err) {
      console.error("Error al actualizar estado de base de datos:", err);
      setError("No se pudo actualizar el estado de la base de datos.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const cambiarPrincipal = async (
    baseDatosEmpresaId: number,
    esPrincipal: boolean,
  ) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await basesDatosEmpresaService.setPrincipal(
        empresaId,
        baseDatosEmpresaId,
        esPrincipal,
      );
      await recargar();
    } catch (err) {
      console.error("Error al actualizar base principal:", err);
      setError("No se pudo actualizar la base principal.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const eliminar = async (baseDatosEmpresaId: number) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await basesDatosEmpresaService.delete(empresaId, baseDatosEmpresaId);
      await recargar();
    } catch (err) {
      console.error("Error al eliminar base de datos:", err);
      setError("No se pudo eliminar la base de datos.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    basesDatos,
    loading,
    submitting,
    error,
    recargar,
    crear,
    actualizar,
    cambiarActivo,
    cambiarPrincipal,
    eliminar,
  };
};
