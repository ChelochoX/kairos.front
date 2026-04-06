import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../Router/routes";
import { coreAuthStorage } from "../../Core/Auth/Utils/coreAuth.storage";
import { useAuthStore } from "../Store/auth.store";

export const PrivateGuard = () => {
  const location = useLocation();

  const isCoreAuthenticated = coreAuthStorage.isAuthenticated();
  const { isAuthenticated: isPlatformAuthenticated } = useAuthStore();

  const isAuthenticated = isCoreAuthenticated || isPlatformAuthenticated;

  if (!isAuthenticated) {
    const isPlatformRoute = location.pathname.startsWith("/platform");

    return (
      <Navigate
        to={isPlatformRoute ? ROUTES.AUTH.MASTER_LOGIN : ROUTES.AUTH.CORE_LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};
