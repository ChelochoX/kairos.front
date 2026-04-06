import { useState } from "react";
import { getApiErrorMessageFromUnknown } from "../../../Shared/Utils/apiError.util";
import { authService } from "../Services/auth.service";
import type { ResetPasswordPlataformaRequest } from "../Types/auth.types";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (
    payload: ResetPasswordPlataformaRequest,
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await authService.resetPassword(payload);
      return true;
    } catch (err: unknown) {
      console.error("Error en resetPassword:", err);

      setError(
        getApiErrorMessageFromUnknown(
          err,
          "No pudimos actualizar la contraseña en este momento. Intentá nuevamente.",
        ),
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    resetPassword,
    loading,
    error,
    setError,
  };
};
