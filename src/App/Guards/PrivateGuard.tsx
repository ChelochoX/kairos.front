import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../Router/routes";
import { coreAuthStorage } from "../../Core/Auth/Utils/coreAuth.storage";

export const PrivateGuard = () => {
  const location = useLocation();

  const isAuthenticated = coreAuthStorage.isAuthenticated();

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
