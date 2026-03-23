interface AlertMessageProps {
  message: string;
  title?: string;
  variant?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
  className?: string;
}

export const AlertMessage = ({
  message,
  title,
  variant = "info",
  onClose,
  className = "",
}: AlertMessageProps) => {
  const styles = {
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-emerald-100/60",
    error: "border-red-200 bg-red-50 text-red-800 shadow-red-100/60",
    info: "border-sky-200 bg-sky-50 text-sky-800 shadow-sky-100/60",
    warning: "border-amber-200 bg-amber-50 text-amber-800 shadow-amber-100/60",
  };

  const iconStyles = {
    success:
      "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    error: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200",
    info: "bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-200",
    warning: "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200",
  };

  const icons = {
    success: "✓",
    error: "!",
    info: "i",
    warning: "⚠",
  };

  const role =
    variant === "error" || variant === "warning" ? "alert" : "status";
  const live =
    variant === "error" || variant === "warning" ? "assertive" : "polite";

  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm shadow-sm ${styles[variant]} ${className}`}
      role={role}
      aria-live={live}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${iconStyles[variant]}`}
        >
          {icons[variant]}
        </span>

        <div className="min-w-0">
          {title && (
            <p className="mb-1 break-words text-sm font-semibold leading-5">
              {title}
            </p>
          )}

          <p className="break-words leading-6 font-medium">{message}</p>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar mensaje"
          className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold opacity-70 transition hover:scale-105 hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
};
