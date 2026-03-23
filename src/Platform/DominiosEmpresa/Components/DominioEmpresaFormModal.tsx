import { useEffect, useState } from "react";
import type {
  DominioEmpresa,
  DominioEmpresaFormValues,
} from "../Types/dominioEmpresa.types";
import { normalizarDominio } from "../Utils/dominioEmpresa.utils";

interface DominioEmpresaFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  loading?: boolean;
  initialData?: DominioEmpresa | null;
  onClose: () => void;
  onSubmit: (values: DominioEmpresaFormValues) => Promise<void>;
}

const initialForm: DominioEmpresaFormValues = {
  dominio: "",
  esPrincipal: false,
};

export const DominioEmpresaFormModal = ({
  open,
  mode,
  loading = false,
  initialData,
  onClose,
  onSubmit,
}: DominioEmpresaFormModalProps) => {
  const [form, setForm] = useState<DominioEmpresaFormValues>(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setForm({
        dominio: initialData.dominio,
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
    field: keyof DominioEmpresaFormValues,
    value: string | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const dominio = normalizarDominio(form.dominio);

    if (!dominio) {
      setError("El dominio es requerido.");
      return false;
    }

    if (dominio.includes("http://") || dominio.includes("https://")) {
      setError("Ingrese solo el dominio, sin http:// ni https://.");
      return false;
    }

    if (dominio.includes(" ")) {
      setError("El dominio no debe contener espacios.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await onSubmit({
      dominio: normalizarDominio(form.dominio),
      esPrincipal: form.esPrincipal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-xl rounded-[28px] bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            {mode === "create" ? "Nuevo dominio" : "Editar dominio"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Configure el dominio asociado a la empresa seleccionada.
          </p>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Dominio
            </label>
            <input
              type="text"
              value={form.dominio}
              onChange={(e) => handleChange("dominio", e.target.value)}
              placeholder="empresa-demo.kairos.com"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
            />
            <p className="mt-2 text-xs text-slate-500">
              Ejemplo: empresa-demo.kairos.com
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
                Si activa esta opción, este dominio pasará a ser el principal de
                la empresa.
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
                ? "Crear dominio"
                : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};
