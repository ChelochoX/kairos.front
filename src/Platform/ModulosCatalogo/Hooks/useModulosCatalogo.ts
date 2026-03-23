import { useCallback, useEffect, useState } from "react";
import { moduloCatalogoService } from "../Services/modulo-catalogo.service";
import type { ModuloCatalogo } from "../Types/modulo-catalogo.types";

export const useModulosCatalogo = () => {
  const [modulos, setModulos] = useState<ModuloCatalogo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtroActivo, setFiltroActivo] = useState<string>("todos");

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const activo =
        filtroActivo === "todos"
          ? undefined
          : filtroActivo === "activos"
            ? true
            : false;

      const data = await moduloCatalogoService.getAll(activo);
      setModulos(data);
    } catch (error) {
      console.error("Error al cargar módulos catálogo:", error);
      setError("No se pudieron cargar los módulos del catálogo.");
    } finally {
      setLoading(false);
    }
  }, [filtroActivo]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  return {
    modulos,
    loading,
    error,
    filtroActivo,
    setFiltroActivo,
    recargar: cargar,
  };
};
