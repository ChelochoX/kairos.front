interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  className = "",
}: StatCardProps) => {
  return (
    <div
      className={`rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card-hover)] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] ${className}`}
    >
      {/* title */}
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]">
        {title}
      </p>

      {/* value (más elegante) */}
      <p className="mt-1 text-lg font-semibold tracking-tight text-[var(--color-text)]">
        {value}
      </p>

      {/* description */}
      {description && (
        <p className="mt-1 text-xs text-[var(--color-text-soft)] leading-5">
          {description}
        </p>
      )}
    </div>
  );
};
