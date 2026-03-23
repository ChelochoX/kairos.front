import { Database, Pencil, Power, ShieldCheck, Trash2 } from "lucide-react";
import type { BaseDatosEmpresa } from "../Types/baseDatosEmpresa.types";
import {
  formatearFecha,
  resumirCadenaConexion,
} from "../Utils/baseDatosEmpresa.utils";
import { EstadoBaseDatosBadge } from "./EstadoBaseDatosBadge";

interface BasesDatosEmpresaTableProps {
  data: BaseDatosEmpresa[];
  loading?: boolean;
  actionLoading?: boolean;
  error?: string | null;
  onEdit: (item: BaseDatosEmpresa) => void;
  onToggleActivo: (item: BaseDatosEmpresa) => void;
  onTogglePrincipal: (item: BaseDatosEmpresa) => void;
  onDelete: (item: BaseDatosEmpresa) => void;
  onCreate: () => void;
}

export const BasesDatosEmpresaTable = ({
  data,
  loading = false,
  actionLoading = false,
  error,
  onEdit,
  onToggleActivo,
  onTogglePrincipal,
  onDelete,
  onCreate,
}: BasesDatosEmpresaTableProps) => {
  if (loading) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center text-slate-500">
        Cargando bases de datos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[24px] border border-dashed border-red-200 bg-red-50 px-6 py-14 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
        <h3 className="text-2xl font-bold text-slate-800">
          No hay bases de datos configuradas
        </h3>
        <p className="mt-3 text-sm text-slate-500">
          La empresa seleccionada todavía no tiene conexiones registradas.
        </p>
        <button
          type="button"
          onClick={onCreate}
          className="mt-6 inline-flex items-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Crear base de datos
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.map((item) => (
        <div
          key={item.baseDatosEmpresaId}
          className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Database size={20} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-slate-800">
                  {item.nombreConexion}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{item.proveedor}</p>
              </div>
            </div>

            <EstadoBaseDatosBadge activo={item.activo} />
          </div>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-slate-700">Principal:</span>{" "}
              {item.esPrincipal ? (
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  Principal
                </span>
              ) : (
                <span>No</span>
              )}
            </div>

            <div>
              <span className="font-semibold text-slate-700">
                Cadena conexión:
              </span>
              <p className="mt-1 break-all text-slate-500">
                {resumirCadenaConexion(item.cadenaConexion)}
              </p>
            </div>

            <div>
              <span className="font-semibold text-slate-700">
                Fecha registro:
              </span>{" "}
              {formatearFecha(item.fechaRegistro)}
            </div>

            <div>
              <span className="font-semibold text-slate-700">
                Fecha modificación:
              </span>{" "}
              {formatearFecha(item.fechaModificacion)}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onEdit(item)}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              <Pencil size={14} />
              Editar
            </button>

            <button
              type="button"
              onClick={() => onToggleActivo(item)}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              <Power size={14} />
              {item.activo ? "Desactivar" : "Activar"}
            </button>

            <button
              type="button"
              onClick={() => onTogglePrincipal(item)}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-300 px-3 py-2 text-xs font-medium text-indigo-700 transition hover:bg-indigo-50 disabled:opacity-60"
            >
              <ShieldCheck size={14} />
              {item.esPrincipal ? "Quitar principal" : "Hacer principal"}
            </button>

            <button
              type="button"
              onClick={() => onDelete(item)}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-60"
            >
              <Trash2 size={14} />
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
