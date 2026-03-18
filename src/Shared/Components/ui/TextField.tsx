interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

export const TextField = ({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
}: TextFieldProps) => {
  return (
    <div>
      <label className="text-sm font-medium text-[var(--color-text-soft)]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-soft)]"
      />
    </div>
  );
};
