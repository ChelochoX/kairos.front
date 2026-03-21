interface EstadoUsuarioPlataformaBadgeProps {
  activo: boolean;
}

export const EstadoUsuarioPlataformaBadge = ({
  activo,
}: EstadoUsuarioPlataformaBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        activo
          ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-red-100 text-red-700 ring-1 ring-red-200"
      }`}
    >
      {activo ? "Activo" : "Inactivo"}
    </span>
  );
};
