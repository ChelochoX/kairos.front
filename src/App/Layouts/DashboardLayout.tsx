import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/auth.store";
import { ROUTES } from "../Router/routes";
import { useCoreAuth } from "../../Core/Auth/Hooks/useCoreAuth";

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCoreRoute = location.pathname.startsWith("/core");

  const { user: platformUser, logout: platformLogout } = useAuthStore();
  const { getSession, logout: coreLogout } = useCoreAuth();

  const coreSession = getSession();

  const userName = isCoreRoute
    ? (coreSession?.usuario?.nombreCompleto ?? "Usuario")
    : (platformUser?.nombre ?? "Usuario");

  const userRole = isCoreRoute
    ? (coreSession?.roles?.[0] ?? "ADMIN_EMPRESA")
    : (platformUser?.rol ?? "SUPER_ADMIN");

  const handleLogout = async () => {
    if (isCoreRoute) {
      await coreLogout();
      return;
    }

    platformLogout();
    navigate(ROUTES.AUTH.MASTER_LOGIN, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--color-bg)_0%,var(--color-bg-soft)_100%)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-lg font-bold text-[var(--color-primary)] shadow-sm">
              K
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--color-text)]">
                Kairos
              </h1>
              <p className="text-sm text-[var(--color-text-soft)]">
                Panel de administración
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 shadow-[var(--shadow-sm)]">
              <p className="text-sm font-semibold leading-5 text-[var(--color-text)]">
                {userName}
              </p>
              <p className="break-words text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]">
                {userRole}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-text)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};
