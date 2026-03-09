import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../Store/auth.store";

export const PrivateGuard = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
