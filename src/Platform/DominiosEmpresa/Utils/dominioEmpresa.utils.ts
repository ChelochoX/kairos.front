export const normalizarDominio = (value: string): string => {
  return value.trim().toLowerCase();
};

export const formatearFecha = (value?: string | null): string => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("es-PY", {
    dateStyle: "short",
    timeStyle: "short",
  });
};
