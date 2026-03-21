import { useCallback, useEffect, useState } from "react";
import { usuarioPlataformaService } from "../Services/usuario-plataforma.service";
import type {
  FiltroActivo,
  UsuarioPlataforma,
} from "../Types/usuario-plataforma.types";

const resolveActivo = (filtro: FiltroActivo): boolean | undefined => {
  if (filtro === "activos") return true;
  if (filtro === "inactivos") return false;
  return undefined;
};

export const useUsuariosPlataforma = () => {
  const [usuarios, setUsuarios] = useState<UsuarioPlataforma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroActivo, setFiltroActivo] = useState<FiltroActivo>("todos");

  const recargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await usuarioPlataformaService.getAll(
        resolveActivo(filtroActivo),
      );

      setUsuarios(data);
    } catch (error) {
      console.error("Error al listar usuarios plataforma:", error);
      setError("No se pudieron cargar los usuarios de plataforma.");
    } finally {
      setLoading(false);
    }
  }, [filtroActivo]);

  useEffect(() => {
    void recargar();
  }, [recargar]);

  return {
    usuarios,
    loading,
    error,
    filtroActivo,
    setFiltroActivo,
    recargar,
  };
};
