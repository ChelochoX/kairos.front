import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { empresaService } from "../Services/empresa.service";
import type { CrearEmpresaRequest } from "../Types/empresa.types";

export const CrearEmpresaPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<CrearEmpresaRequest>({
    codigoEmpresa: "",
    nombreComercial: "",
    razonSocial: "",
    rubro: "",
    moneda: "",
    whatsAppContacto: "",
    emailContacto: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof CrearEmpresaRequest, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await empresaService.create(form);

      navigate("/dashboard/empresas", { replace: true });
    } catch (err) {
      console.error("Error al crear empresa:", err);
      setError("No se pudo crear la empresa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Nueva empresa</h2>

        <p className="mt-2 text-sm text-slate-600">
          Registra una nueva empresa en la plataforma Kairos.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-slate-600">Código Empresa</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.codigoEmpresa}
              onChange={(e) => handleChange("codigoEmpresa", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Nombre Comercial</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.nombreComercial}
              onChange={(e) => handleChange("nombreComercial", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-600">Razón Social</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={form.razonSocial}
            onChange={(e) => handleChange("razonSocial", e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-slate-600">Rubro</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.rubro}
              onChange={(e) => handleChange("rubro", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Moneda</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.moneda}
              onChange={(e) => handleChange("moneda", e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-slate-600">WhatsApp</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.whatsAppContacto}
              onChange={(e) => handleChange("whatsAppContacto", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.emailContacto}
              onChange={(e) => handleChange("emailContacto", e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/empresas")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Crear empresa"}
          </button>
        </div>
      </form>
    </div>
  );
};
