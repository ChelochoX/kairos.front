import type { UsuarioPlataforma } from "../Types/usuario-plataforma.types";

interface UsuarioPlataformaCardProps {
  usuario: UsuarioPlataforma;
  changingStatus?: boolean;
  onVerDetalle: (usuario: UsuarioPlataforma) => void;
  onEditar: (usuario: UsuarioPlataforma) => void;
  onCambiarClave: (usuario: UsuarioPlataforma) => void;
  onToggleActivo: (usuario: UsuarioPlataforma) => void;
}

const formatUsuarioHandle = (value?: string | null) => {
  if (!value) return "-";
  return value.startsWith("@") ? value : `@${value}`;
};

export const UsuarioPlataformaCard = ({
  usuario,
  changingStatus = false,
  onVerDetalle,
  onEditar,
  onCambiarClave,
  onToggleActivo,
}: UsuarioPlataformaCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-slate-900">
            {usuario.nombre}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {formatUsuarioHandle(usuario.usuario)}
          </p>

          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
            {usuario.rol}
          </p>

          <p className="mt-1 break-words text-sm text-slate-500">
            {usuario.email}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ${
            usuario.activo
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {usuario.activo ? "Activo" : "Inactivo"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onVerDetalle(usuario)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Ver detalle
        </button>

        <button
          type="button"
          onClick={() => onEditar(usuario)}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onCambiarClave(usuario)}
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          Cambiar clave
        </button>

        <button
          type="button"
          onClick={() => onToggleActivo(usuario)}
          disabled={changingStatus}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            usuario.activo
              ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          } ${changingStatus ? "cursor-not-allowed opacity-60" : ""}`}
        >
          {changingStatus
            ? "Procesando..."
            : usuario.activo
              ? "Desactivar"
              : "Activar"}
        </button>
      </div>
    </div>
  );
};
