import { useNavigate } from "react-router-dom";
import { coreAuthService } from "../Services/coreAuth.service";
import { coreAuthStorage } from "../Utils/coreAuth.storage";
import type { CoreLoginRequest, CoreSession } from "../Types/auth.types";
import { ROUTES } from "../../../App/Router/routes";

export const useCoreAuth = () => {
  const navigate = useNavigate();

  const login = async (payload: CoreLoginRequest) => {
    const response = await coreAuthService.login(payload);

    const session: CoreSession = {
      empresaId: response.empresaId,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiraEnUtc: response.expiraEnUtc,
      usuario: response.usuario,
      roles: response.roles,
      permisos: response.permisos,
      modulos: response.modulos,
    };

    coreAuthStorage.saveSession(session);

    return response;
  };

  const logout = async () => {
    const session = coreAuthStorage.getSession();

    try {
      if (session) {
        await coreAuthService.logout(session.refreshToken, session.accessToken);
      }
    } finally {
      coreAuthStorage.clearSession();
      navigate(ROUTES.AUTH.CORE_LOGIN, { replace: true });
    }
  };

  const getSession = () => coreAuthStorage.getSession();

  const isAuthenticated = () => coreAuthStorage.isAuthenticated();

  return {
    login,
    logout,
    getSession,
    isAuthenticated,
  };
};
