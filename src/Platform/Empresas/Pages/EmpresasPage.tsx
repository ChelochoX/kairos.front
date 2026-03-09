import { useNavigate } from "react-router-dom";
import { useEmpresas } from "../Hooks/useEmpresas";

export const EmpresasPage = () => {
  const navigate = useNavigate();

  const { empresas, loading, error, filtroActiva, setFiltroActiva, recargar } =
    useEmpresas();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Empresas
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Gestiona las empresas registradas en la plataforma Kairos.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => navigate("/dashboard/empresas/nueva")}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Nueva empresa
            </button>

            <select
              value={filtroActiva}
              onChange={(e) =>
                setFiltroActiva(
                  e.target.value as "todas" | "activas" | "inactivas",
                )
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-slate-500"
            >
              <option value="todas">Todas</option>
              <option value="activas">Activas</option>
              <option value="inactivas">Inactivas</option>
            </select>

            <button
              type="button"
              onClick={() => void recargar()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Recargar
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {loading && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Cargando empresas...
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && empresas.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            No se encontraron empresas para el filtro seleccionado.
          </div>
        )}

        {!loading && !error && empresas.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {empresas.map((empresa) => (
              <article
                key={empresa.empresaId}
                className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {empresa.nombreComercial}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Código: {empresa.codigoEmpresa}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Rubro: {empresa.rubro}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      empresa.activa
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {empresa.activa ? "Activa" : "Inactiva"}
                  </span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Ver detalle
                  </button>

                  <button
                    type="button"
                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Editar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
