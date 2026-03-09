import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Outlet />
    </div>
  );
};
