import { StatCard } from "../../../Shared/Components/ui/StatCard";
import { useCoreAuth } from "../../Auth/Hooks/useCoreAuth";

export const DashboardPage = () => {
  const { getSession } = useCoreAuth();
  const session = getSession();

  if (!session) return null;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--color-text-soft)]">
            Panel principal
          </p>

          <h1 className="mt-1 text-xl font-semibold text-[var(--color-text)]">
            Bienvenido, {session.usuario.nombreCompleto}
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            Este es tu espacio inicial dentro de Kairos Core.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-hover)] px-4 py-2 text-xs text-[var(--color-text-soft)]">
          <p>
            <span className="font-medium">Usuario:</span>{" "}
            <span className="font-semibold text-[var(--color-text)]">
              {session.usuario.username}
            </span>
          </p>
          <p>
            <span className="font-medium">Empresa:</span>{" "}
            <span className="font-semibold text-[var(--color-text)]">
              #{session.empresaId}
            </span>
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Empresa"
          value={`#${session.empresaId}`}
          description="Contexto activo"
        />

        <StatCard
          title="Rol"
          value={session.roles[0] ?? "N/A"}
          description="Perfil del usuario"
        />

        <StatCard
          title="Módulos"
          value={session.modulos.length}
          description="Accesos habilitados"
        />

        <StatCard
          title="Correo"
          value={session.usuario.email}
          description="Cuenta vinculada"
        />
      </div>

      {/* MÓDULOS */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Módulos disponibles
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-soft)]">
          Accedé a los módulos habilitados según tu sesión.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {session.modulos.map((modulo) => (
            <div
              key={modulo}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-hover)] p-4 transition hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-wide text-[var(--color-text-soft)]">
                Módulo
              </p>

              <p className="mt-1 text-base font-semibold text-[var(--color-text)]">
                {modulo}
              </p>

              <button className="mt-3 w-full rounded-xl bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-white transition hover:opacity-90">
                Ingresar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
