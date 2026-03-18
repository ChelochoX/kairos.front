import { useCallback, useEffect, useState } from "react";
import { empresaService } from "../Services/empresa.service";
import type { Empresa, FiltroActiva } from "../Types/empresa.types";

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtroActiva, setFiltroActiva] = useState<FiltroActiva>("todas");

  const cargarEmpresas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let activa: boolean | undefined;

      if (filtroActiva === "activas") activa = true;
      else if (filtroActiva === "inactivas") activa = false;

      const data = await empresaService.getAll(activa);
      setEmpresas(data);
    } catch (err) {
      console.error("Error al cargar empresas:", err);
      setError("No se pudieron cargar las empresas.");
    } finally {
      setLoading(false);
    }
  }, [filtroActiva]);

  useEffect(() => {
    void cargarEmpresas();
  }, [cargarEmpresas]);

  return {
    empresas,
    loading,
    error,
    filtroActiva,
    setFiltroActiva,
    recargar: cargarEmpresas,
  };
};
