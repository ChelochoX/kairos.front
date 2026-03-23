export const normalizarTexto = (value: string): string => value.trim();

export const formatearFecha = (value?: string | null): string => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("es-PY", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const resumirCadenaConexion = (value: string, max = 70): string => {
  if (!value) return "-";
  if (value.length <= max) return value;
  return `${value.slice(0, max)}...`;
};
