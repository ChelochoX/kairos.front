interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-card-hover)] px-6 py-10 text-center">
      <h3 className="text-lg font-semibold text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-soft)]">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
