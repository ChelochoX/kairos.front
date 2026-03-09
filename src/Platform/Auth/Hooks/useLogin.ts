import { useState } from "react";
import { useAuthStore } from "../../../App/Store/auth.store";
import { authService } from "../Services/auth.service";
import type {
  LoginPlataformaRequest,
  LoginPlataformaResponse,
} from "../Types/auth.types";

export const useLogin = () => {
  const { setAuth } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    payload: LoginPlataformaRequest,
  ): Promise<LoginPlataformaResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const data = await authService.login(payload);

      if (!data?.token) {
        setError("La respuesta del servidor no contiene un token válido.");
        return null;
      }

      setAuth(data);

      return data;
    } catch (err: unknown) {
      console.error("Error en login:", err);
      setError("No se pudo iniciar sesión.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};
