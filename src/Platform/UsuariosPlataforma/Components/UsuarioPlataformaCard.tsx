import type { UsuarioPlataforma } from "../Types/usuario-plataforma.types";
import { EstadoUsuarioPlataformaBadge } from "./EstadoUsuarioPlataformaBadge";

interface UsuarioPlataformaCardProps {
  usuario: UsuarioPlataforma;
  changingStatus: boolean;
  onVerDetalle: (usuario: UsuarioPlataforma) => void;
  onEditar: (usuario: UsuarioPlataforma) => void;
  onCambiarClave: (usuario: UsuarioPlataforma) => void;
  onToggleActivo: (usuario: UsuarioPlataforma) => void;
}

export const UsuarioPlataformaCard = ({
  usuario,
  changingStatus,
  onVerDetalle,
  onEditar,
  onCambiarClave,
  onToggleActivo,
}: UsuarioPlataformaCardProps) => {
  return (
    <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-sm)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-[var(--color-text)]">
            {usuario.nombre}
          </h3>

          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            @{usuario.usuario}
          </p>

          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            {usuario.rol}
          </p>

          <p className="mt-1 truncate text-sm text-[var(--color-text-soft)]">
            {usuario.email?.trim() ? usuario.email : "Sin email"}
          </p>
        </div>

        <EstadoUsuarioPlataformaBadge activo={usuario.activo} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onVerDetalle(usuario)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Ver detalle
        </button>

        <button
          type="button"
          onClick={() => onEditar(usuario)}
          className="rounded-xl bg-[var(--color-text)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onCambiarClave(usuario)}
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          Cambiar clave
        </button>

        <button
          type="button"
          onClick={() => onToggleActivo(usuario)}
          disabled={changingStatus}
          className={`rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
            usuario.activo
              ? "bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100"
              : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
          }`}
        >
          {changingStatus
            ? "Procesando..."
            : usuario.activo
              ? "Desactivar"
              : "Activar"}
        </button>
      </div>
    </article>
  );
};
