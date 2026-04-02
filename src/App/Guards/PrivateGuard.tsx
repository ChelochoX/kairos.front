import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../Store/auth.store";
import { ROUTES } from "../Router/routes";

export const PrivateGuard = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.AUTH.CORE_LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};
