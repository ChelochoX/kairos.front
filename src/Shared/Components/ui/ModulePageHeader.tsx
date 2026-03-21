interface ModulePageHeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
  backLabel?: string;
  actions?: React.ReactNode;
}

export const ModulePageHeader = ({
  title,
  subtitle,
  onBack,
  backLabel,
  actions,
}: ModulePageHeaderProps) => {
  return (
    <section className="overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-r from-indigo-500 to-slate-900 p-6 text-white shadow-[var(--shadow-md)]">
      {onBack && (
        <div className="mb-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            ← {backLabel ?? "Volver"}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-white/80 sm:text-base">{subtitle}</p>
        </div>

        {actions && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
};
