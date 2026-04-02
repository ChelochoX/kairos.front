import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCoreAuth } from "../Hooks/useCoreAuth";
import { coreAuthService } from "../Services/coreAuth.service";
import type { EmpresaLoginItem } from "../Types/auth.types";
import { AlertMessage } from "../../../Shared/Components/ui/AlertMessage";
import { ROUTES } from "../../../App/Router/routes";

export const CoreLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useCoreAuth();

  const [empresas, setEmpresas] = useState<EmpresaLoginItem[]>([]);
  const [empresaId, setEmpresaId] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEmpresas, setLoadingEmpresas] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        setLoadingEmpresas(true);
        setError("");

        const data = await coreAuthService.listEmpresas();
        setEmpresas(data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "No se pudo cargar la lista de empresas.";

        setError(message);
      } finally {
        setLoadingEmpresas(false);
      }
    };

    loadEmpresas();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setSuccessTitle("");

    if (!empresaId) {
      setError("Seleccioná una empresa para continuar.");
      return;
    }

    if (!userLogin.trim()) {
      setError("Ingresá tu usuario o email para continuar.");
      return;
    }

    if (!password.trim()) {
      setError("Ingresá tu contraseña para continuar.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        empresaId: Number(empresaId),
        login: userLogin.trim(),
        password,
      });

      setSuccessTitle("Bienvenido a Kairos Core");
      setSuccessMessage(
        `Hola ${response.usuario.nombreCompleto}, estamos preparando tu espacio de trabajo...`,
      );

      setTimeout(() => {
        navigate(ROUTES.CORE.DASHBOARD, { replace: true });
      }, 3000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocurrió un inconveniente al iniciar sesión.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormDisabled = loading || loadingEmpresas || !!successMessage;

  return (
    <div className="w-full max-w-md rounded-[28px] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
      <div className="mb-8 text-center">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Plataforma administrativa
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
          Kairos Core
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Empresa
          </label>
          <select
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
            disabled={isFormDisabled}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <option value="">
              {loadingEmpresas
                ? "Cargando empresas..."
                : "Seleccione una empresa"}
            </option>

            {empresas.map((empresa) => (
              <option key={empresa.empresaId} value={empresa.empresaId}>
                {empresa.nombreComercial}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Usuario o email
          </label>
          <input
            type="text"
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
            disabled={isFormDisabled}
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="Ingresá tu usuario o email"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isFormDisabled}
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            placeholder="Ingresá tu contraseña"
          />
        </div>

        {error && !successMessage && (
          <AlertMessage
            variant="error"
            title="No pudimos iniciar sesión"
            message={error}
          />
        )}

        {successMessage && (
          <AlertMessage
            variant="success"
            title={successTitle}
            message={successMessage}
          />
        )}

        <button
          type="submit"
          disabled={loading || loadingEmpresas || !!successMessage}
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {successMessage
            ? "Ingresando..."
            : loading
              ? "Validando acceso..."
              : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};
