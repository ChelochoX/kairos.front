import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../App/Store/auth.store";

interface ModuloCard {
  title: string;
  description: string;
  route: string;
}

const modulos: ModuloCard[] = [
  {
    title: "Empresas",
    description: "Gestiona las empresas registradas en la plataforma.",
    route: "/dashboard/empresas",
  },
  {
    title: "Usuarios Plataforma",
    description: "Administra usuarios administrativos y sus accesos.",
    route: "/dashboard/usuarios-plataforma",
  },
  {
    title: "Módulos Catálogo",
    description: "Define los módulos base disponibles en Kairos.",
    route: "/dashboard/modulos-catalogo",
  },
  {
    title: "Módulos Empresa",
    description: "Asigna y controla módulos habilitados por empresa.",
    route: "/dashboard/modulos-empresa",
  },
  {
    title: "Dominios Empresa",
    description: "Gestiona dominios configurados para cada empresa.",
    route: "/dashboard/dominios-empresa",
  },
  {
    title: "Bases de Datos Empresa",
    description: "Administra las bases de datos asociadas a las empresas.",
    route: "/dashboard/bases-datos-empresa",
  },
];

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const resumen = {
    empresas: 12,
    usuarios: 5,
    modulosCatalogo: 8,
    modulosEmpresa: 14,
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Centro de mando
        </h2>

        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Bienvenido,{" "}
          <span className="font-medium text-slate-800">{user?.nombre}</span>.
          Desde aquí puedes administrar la plataforma Kairos y acceder
          rápidamente a sus módulos principales.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Resumen general
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Vista rápida del estado actual de la plataforma.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Empresas</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {resumen.empresas}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Usuarios plataforma</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {resumen.usuarios}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Módulos catálogo</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {resumen.modulosCatalogo}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Módulos empresa</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {resumen.modulosEmpresa}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
            Módulos principales
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Accede rápidamente a las áreas principales de administración.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {modulos.map((modulo) => (
            <button
              key={modulo.route}
              type="button"
              onClick={() => navigate(modulo.route)}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-full flex-col">
                <h4 className="text-base font-semibold text-slate-900 sm:text-lg">
                  {modulo.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {modulo.description}
                </p>

                <div className="mt-5">
                  <span className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition group-hover:bg-slate-800">
                    Gestionar
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
