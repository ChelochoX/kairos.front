import { useCallback, useEffect, useState } from "react";
import { empresaService } from "../Services/empresa.service";
import type { Empresa } from "../Types/empresa.types";

export const useDetalleEmpresa = (empresaId?: number) => {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarEmpresa = useCallback(async () => {
    if (!empresaId || Number.isNaN(empresaId)) {
      setError("Identificador de empresa inválido.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await empresaService.getById(empresaId);
      setEmpresa(data);
    } catch (err) {
      console.error("Error al cargar empresa:", err);
      setError("No se pudo obtener la empresa.");
    } finally {
      setLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void cargarEmpresa();
  }, [cargarEmpresa]);

  return {
    empresa,
    loading,
    error,
    recargar: cargarEmpresa,
  };
};
