interface ModuleCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const ModuleCard = ({
  title,
  description,
  onClick,
}: ModuleCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-left shadow-[var(--shadow-sm)] transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex h-full flex-col">
        <div className="mb-3 h-1.5 w-14 rounded-full bg-[var(--color-primary-soft)] transition group-hover:bg-[var(--color-primary)]" />

        <h4 className="text-lg font-semibold text-[var(--color-text)]">
          {title}
        </h4>

        <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
          {description}
        </p>

        <div className="mt-6">
          <span className="inline-flex items-center rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition group-hover:bg-[var(--color-primary-hover)] group-hover:shadow-md">
            Gestionar
          </span>
        </div>
      </div>
    </button>
  );
};
