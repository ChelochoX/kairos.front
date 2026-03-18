interface StatCardProps {
  title: string;
  value: number;
  className?: string;
}

export const StatCard = ({ title, value, className = "" }: StatCardProps) => {
  return (
    <div
      className={`rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card-hover)] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] ${className}`}
    >
      <p className="text-sm font-medium text-[var(--color-text-soft)]">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)]">
        {value}
      </p>
    </div>
  );
};
