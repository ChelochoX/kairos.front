interface AlertMessageProps {
  message: string;
  variant?: "error" | "info" | "success";
}

export const AlertMessage = ({
  message,
  variant = "info",
}: AlertMessageProps) => {
  const styles = {
    error: "border-red-200 bg-red-50 text-red-700",
    info: "border-[var(--color-border)] bg-[var(--color-card-hover)] text-[var(--color-text-soft)]",
    success: "border-green-200 bg-green-50 text-green-700",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles[variant]}`}>
      {message}
    </div>
  );
};
