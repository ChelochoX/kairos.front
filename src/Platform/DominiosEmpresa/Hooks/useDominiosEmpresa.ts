import { useCallback, useEffect, useState } from "react";
import { dominiosEmpresaService } from "../Services/dominiosEmpresaService";
import type {
  ActualizarDominioEmpresaRequest,
  CrearDominioEmpresaRequest,
  DominioEmpresa,
} from "../Types/dominioEmpresa.types";

export const useDominiosEmpresa = (empresaId?: number) => {
  const [dominios, setDominios] = useState<DominioEmpresa[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    if (!empresaId) {
      setDominios([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await dominiosEmpresaService.getAll(empresaId);
      setDominios(data);
    } catch (err) {
      console.error("Error al cargar dominios:", err);
      setError("No se pudieron cargar los dominios.");
      setDominios([]);
    } finally {
      setLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void recargar();
  }, [recargar]);

  const crear = async (payload: CrearDominioEmpresaRequest) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await dominiosEmpresaService.create(empresaId, payload);
      await recargar();
    } catch (err) {
      console.error("Error al crear dominio:", err);
      setError("No se pudo crear el dominio.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const actualizar = async (
    dominioEmpresaId: number,
    payload: ActualizarDominioEmpresaRequest,
  ) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await dominiosEmpresaService.update(empresaId, dominioEmpresaId, payload);
      await recargar();
    } catch (err) {
      console.error("Error al actualizar dominio:", err);
      setError("No se pudo actualizar el dominio.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const cambiarActivo = async (dominioEmpresaId: number, activo: boolean) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await dominiosEmpresaService.setActivo(
        empresaId,
        dominioEmpresaId,
        activo,
      );
      await recargar();
    } catch (err) {
      console.error("Error al actualizar estado del dominio:", err);
      setError("No se pudo actualizar el estado del dominio.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const cambiarPrincipal = async (
    dominioEmpresaId: number,
    esPrincipal: boolean,
  ) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await dominiosEmpresaService.setPrincipal(
        empresaId,
        dominioEmpresaId,
        esPrincipal,
      );
      await recargar();
    } catch (err) {
      console.error("Error al actualizar dominio principal:", err);
      setError("No se pudo actualizar el dominio principal.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const eliminar = async (dominioEmpresaId: number) => {
    if (!empresaId) return;

    try {
      setSubmitting(true);
      setError(null);
      await dominiosEmpresaService.delete(empresaId, dominioEmpresaId);
      await recargar();
    } catch (err) {
      console.error("Error al eliminar dominio:", err);
      setError("No se pudo eliminar el dominio.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    dominios,
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
