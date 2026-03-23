interface EstadoBaseDatosBadgeProps {
  activo: boolean;
}

export const EstadoBaseDatosBadge = ({ activo }: EstadoBaseDatosBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        activo ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
      }`}
    >
      {activo ? "Activo" : "Inactivo"}
    </span>
  );
};
