import { Outlet } from "react-router-dom";
import { useAuthStore } from "../Store/auth.store";

export const DashboardLayout = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Kairos</h1>
            <p className="text-sm text-slate-500">Panel de administración</p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
            <div className="text-right leading-tight">
              <p className="text-sm font-medium text-slate-800">
                {user?.nombre ?? "Usuario"}
              </p>
              <p className="text-xs text-slate-500 break-words">
                {user?.rol ?? ""}
              </p>
            </div>

            <button
              onClick={logout}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 sm:px-4"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
        <Outlet />
      </main>
    </div>
  );
};
