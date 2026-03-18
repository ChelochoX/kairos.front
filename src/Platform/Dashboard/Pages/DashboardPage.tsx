import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../App/Store/auth.store";
import { ModuleCard } from "../../../Shared/Components/ui/ModuleCard";
import { PageHeader } from "../../../Shared/Components/ui/PageHeader";
import { SectionCard } from "../../../Shared/Components/ui/SectionCard";
import { StatCard } from "../../../Shared/Components/ui/StatCard";

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
    <div className="space-y-7">
      <SectionCard className="overflow-hidden border-[color:color-mix(in_srgb,var(--color-primary)_18%,white)] bg-gradient-to-r from-[var(--color-card)] via-[var(--color-primary-soft)] to-[var(--color-card)]">
        <PageHeader
          title="Centro de mando"
          description={`Bienvenido, ${
            user?.nombre ?? "usuario"
          }. Desde aquí puedes administrar la plataforma Kairos y acceder rápidamente a sus módulos principales.`}
        />
      </SectionCard>

      <SectionCard>
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-[var(--color-text)]">
            Resumen general
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            Vista rápida del estado actual de la plataforma.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Empresas"
            value={resumen.empresas}
            className="bg-gradient-to-br from-blue-50 to-white"
          />
          <StatCard
            title="Usuarios plataforma"
            value={resumen.usuarios}
            className="bg-gradient-to-br from-emerald-50 to-white"
          />
          <StatCard
            title="Módulos catálogo"
            value={resumen.modulosCatalogo}
            className="bg-gradient-to-br from-violet-50 to-white"
          />
          <StatCard
            title="Módulos empresa"
            value={resumen.modulosEmpresa}
            className="bg-gradient-to-br from-amber-50 to-white"
          />
        </div>
      </SectionCard>

      <SectionCard>
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-[var(--color-text)]">
            Módulos principales
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            Accede rápidamente a las áreas principales de administración.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {modulos.map((modulo) => (
            <ModuleCard
              key={modulo.route}
              title={modulo.title}
              description={modulo.description}
              onClick={() => navigate(modulo.route)}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
};
