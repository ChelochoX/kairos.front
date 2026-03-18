interface EmpresaInfoItemProps {
  label: string;
  value?: string | null;
}

export const EmpresaInfoItem = ({ label, value }: EmpresaInfoItemProps) => {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-hover)] p-4">
      <p className="text-sm font-medium text-[var(--color-text-soft)]">
        {label}
      </p>
      <p className="mt-2 text-sm text-[var(--color-text)]">
        {value?.trim() ? value : "-"}
      </p>
    </div>
  );
};
