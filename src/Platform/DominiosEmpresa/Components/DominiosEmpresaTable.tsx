import { Pencil, Power, ShieldCheck, Trash2 } from "lucide-react";
import type { DominioEmpresa } from "../Types/dominioEmpresa.types";
import { formatearFecha } from "../Utils/dominioEmpresa.utils";
import { EstadoBadge } from "./EstadoBadge";

interface DominiosEmpresaTableProps {
  data: DominioEmpresa[];
  loading?: boolean;
  actionLoading?: boolean;
  error?: string | null;
  onEdit: (item: DominioEmpresa) => void;
  onToggleActivo: (item: DominioEmpresa) => void;
  onTogglePrincipal: (item: DominioEmpresa) => void;
  onDelete: (item: DominioEmpresa) => void;
  onCreate: () => void;
}

export const DominiosEmpresaTable = ({
  data,
  loading = false,
  actionLoading = false,
  error,
  onEdit,
  onToggleActivo,
  onTogglePrincipal,
  onDelete,
  onCreate,
}: DominiosEmpresaTableProps) => {
  if (loading) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center text-slate-500">
        Cargando dominios...
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
          No hay dominios configurados
        </h3>
        <p className="mt-3 text-sm text-slate-500">
          La empresa seleccionada todavía no tiene dominios registrados.
        </p>
        <button
          type="button"
          onClick={onCreate}
          className="mt-6 inline-flex items-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Crear dominio
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4 font-semibold">Dominio</th>
              <th className="px-5 py-4 font-semibold">Principal</th>
              <th className="px-5 py-4 font-semibold">Estado</th>
              <th className="px-5 py-4 font-semibold">Fecha registro</th>
              <th className="px-5 py-4 font-semibold">Fecha modificación</th>
              <th className="px-5 py-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((item) => (
              <tr key={item.dominioEmpresaId} className="hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-800">
                    {item.dominio}
                  </div>
                </td>

                <td className="px-5 py-4">
                  {item.esPrincipal ? (
                    <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      Principal
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">No</span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <EstadoBadge activo={item.activo} />
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {formatearFecha(item.fechaRegistro)}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {formatearFecha(item.fechaModificacion)}
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap justify-end gap-2">
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
                      {item.esPrincipal
                        ? "Quitar principal"
                        : "Hacer principal"}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
