import { useState } from "react";
import { getApiErrorMessageFromUnknown } from "../../../Shared/Utils/apiError.util";
import { authService } from "../Services/auth.service";
import type {
  ForgotPasswordPlataformaRequest,
  ForgotPasswordPlataformaResponse,
} from "../Types/auth.types";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPassword = async (
    payload: ForgotPasswordPlataformaRequest,
  ): Promise<ForgotPasswordPlataformaResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const data = await authService.forgotPassword(payload);

      if (!data?.tokenRecuperacion) {
        setError(
          "No pudimos preparar el cambio de contraseña en este momento.",
        );
        return null;
      }

      return data;
    } catch (err: unknown) {
      console.error("Error en forgotPassword:", err);

      setError(
        getApiErrorMessageFromUnknown(
          err,
          "No pudimos iniciar la recuperación de contraseña. Intentá nuevamente.",
        ),
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    forgotPassword,
    loading,
    error,
    setError,
  };
};
