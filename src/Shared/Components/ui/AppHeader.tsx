interface AppHeaderProps {
  appName?: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  onLogout: () => void;
}

export const AppHeader = ({
  appName = "Kairos",
  subtitle = "Panel de administración",
  userName = "Usuario",
  userRole = "SUPER_ADMIN",
  onLogout,
}: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {/* LOGO / APP */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-lg font-bold text-[var(--color-primary)] shadow-sm">
            K
          </div>

          <div>
            <h1 className="text-xl font-bold text-[var(--color-text)]">
              {appName}
            </h1>
            <p className="text-sm text-[var(--color-text-soft)]">{subtitle}</p>
          </div>
        </div>

        {/* USER + LOGOUT */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 shadow-sm">
            <p className="text-sm font-semibold text-[var(--color-text)]">
              {userName}
            </p>
            <p className="text-xs uppercase text-[var(--color-text-soft)]">
              {userRole}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="rounded-2xl bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};
