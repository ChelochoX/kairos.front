import { useCallback, useEffect, useState } from "react";
import { moduloEmpresaService } from "../Services/modulo-empresa.service";
import type { ModuloEmpresa } from "../Types/modulo-empresa.types";

export const useModulosEmpresa = (empresaId: number | null) => {
  const [modulos, setModulos] = useState<ModuloEmpresa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    if (!empresaId) {
      setModulos([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await moduloEmpresaService.getAll(empresaId);
      setModulos(data);
    } catch (error) {
      console.error("Error al cargar módulos empresa:", error);
      setError("No se pudieron cargar los módulos asignados a la empresa.");
    } finally {
      setLoading(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  return {
    modulos,
    loading,
    error,
    recargar: cargar,
  };
};
