import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../App/Router/routes";
import { useAuthStore } from "../../../App/Store/auth.store";
import { getApiErrorMessageFromUnknown } from "../../../Shared/Utils/apiError.util";
import { authService } from "../Services/auth.service";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout: clearSession } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Backend logout (opcional)
      try {
        await authService.logout();
      } catch (err) {
        console.warn("Logout backend falló, pero seguimos:", err);
      }

      // Logout real
      clearSession();

      navigate(ROUTES.AUTH.MASTER_LOGIN, { replace: true });
    } catch (err: unknown) {
      setError(
        getApiErrorMessageFromUnknown(err, "No pudimos cerrar la sesión."),
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    error,
  };
};
