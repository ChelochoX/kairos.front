import { useEffect, useState } from "react";
import type {
  BaseDatosEmpresa,
  BaseDatosEmpresaFormValues,
} from "../Types/baseDatosEmpresa.types";
import { normalizarTexto } from "../Utils/baseDatosEmpresa.utils";

interface BaseDatosEmpresaFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  loading?: boolean;
  initialData?: BaseDatosEmpresa | null;
  onClose: () => void;
  onSubmit: (values: BaseDatosEmpresaFormValues) => Promise<void>;
}

const initialForm: BaseDatosEmpresaFormValues = {
  nombreConexion: "",
  cadenaConexion: "",
  proveedor: "SqlServer",
  esPrincipal: false,
};

export const BaseDatosEmpresaFormModal = ({
  open,
  mode,
  loading = false,
  initialData,
  onClose,
  onSubmit,
}: BaseDatosEmpresaFormModalProps) => {
  const [form, setForm] = useState<BaseDatosEmpresaFormValues>(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setForm({
        nombreConexion: initialData.nombreConexion,
        cadenaConexion: initialData.cadenaConexion,
        proveedor: initialData.proveedor,
        esPrincipal: initialData.esPrincipal,
      });
      setError("");
      return;
    }

    setForm(initialForm);
    setError("");
  }, [open, mode, initialData]);

  if (!open) return null;

  const handleChange = (
    field: keyof BaseDatosEmpresaFormValues,
    value: string | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const nombreConexion = normalizarTexto(form.nombreConexion);
    const cadenaConexion = normalizarTexto(form.cadenaConexion);
    const proveedor = normalizarTexto(form.proveedor);

    if (!nombreConexion) {
      setError("El nombre de conexión es requerido.");
      return false;
    }

    if (!cadenaConexion) {
      setError("La cadena de conexión es requerida.");
      return false;
    }

    if (!proveedor) {
      setError("El proveedor es requerido.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await onSubmit({
      nombreConexion: normalizarTexto(form.nombreConexion),
      cadenaConexion: normalizarTexto(form.cadenaConexion),
      proveedor: normalizarTexto(form.proveedor),
      esPrincipal: form.esPrincipal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-2xl rounded-[28px] bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            {mode === "create" ? "Nueva base de datos" : "Editar base de datos"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Configure la conexión asociada a la empresa seleccionada.
          </p>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Nombre de conexión
            </label>
            <input
              type="text"
              value={form.nombreConexion}
              onChange={(e) => handleChange("nombreConexion", e.target.value)}
              placeholder="KAIROS_CORE_PRINCIPAL"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Proveedor
            </label>
            <input
              type="text"
              value={form.proveedor}
              onChange={(e) => handleChange("proveedor", e.target.value)}
              placeholder="SqlServer"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Cadena de conexión
            </label>
            <textarea
              value={form.cadenaConexion}
              onChange={(e) => handleChange("cadenaConexion", e.target.value)}
              placeholder="Server=...;Initial Catalog=...;User Id=...;Password=...;"
              disabled={loading}
              rows={5}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
            />
            <p className="mt-2 text-xs text-slate-500">
              Se recomienda pegar la cadena completa exacta para evitar errores
              de conexión.
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-4">
            <input
              type="checkbox"
              checked={form.esPrincipal}
              onChange={(e) => handleChange("esPrincipal", e.target.checked)}
              disabled={loading}
              className="mt-1"
            />

            <div>
              <span className="block text-sm font-semibold text-slate-700">
                Marcar como principal
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                Si activa esta opción, esta conexión pasará a ser la principal
                de la empresa.
              </span>
            </div>
          </label>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading
              ? "Guardando..."
              : mode === "create"
                ? "Crear base de datos"
                : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};
