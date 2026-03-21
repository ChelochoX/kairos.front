import type { UsuarioPlataforma } from "../Types/usuario-plataforma.types";
import { EstadoUsuarioPlataformaBadge } from "./EstadoUsuarioPlataformaBadge";
import { UsuarioPlataformaInfoItem } from "./UsuarioPlataformaInfoItem";

interface UsuarioPlataformaDetailPanelProps {
  usuario: UsuarioPlataforma;
  changingStatus: boolean;
  onEditar: (usuario: UsuarioPlataforma) => void;
  onCambiarClave: (usuario: UsuarioPlataforma) => void;
  onToggleActivo: (usuario: UsuarioPlataforma) => void;
}

export const UsuarioPlataformaDetailPanel = ({
  usuario,
  changingStatus,
  onEditar,
  onCambiarClave,
  onToggleActivo,
}: UsuarioPlataformaDetailPanelProps) => {
  const detailRows = [
    { label: "Nombre", value: usuario.nombre },
    { label: "Usuario", value: usuario.usuario },
    { label: "Email", value: usuario.email },
    { label: "Rol", value: usuario.rol },
    { label: "Fecha registro", value: usuario.fechaRegistro },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4 rounded-2xl bg-[var(--color-card-hover)] p-5">
        <div>
          <h4 className="text-xl font-semibold text-[var(--color-text)]">
            {usuario.nombre}
          </h4>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            @{usuario.usuario}
          </p>
        </div>

        <EstadoUsuarioPlataformaBadge activo={usuario.activo} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {detailRows.map((item) => (
          <UsuarioPlataformaInfoItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => onEditar(usuario)}
          className="rounded-xl bg-[var(--color-text)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Editar usuario
        </button>

        <button
          type="button"
          onClick={() => onCambiarClave(usuario)}
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          Cambiar clave
        </button>

        <button
          type="button"
          onClick={() => onToggleActivo(usuario)}
          disabled={changingStatus}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
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
    </div>
  );
};
