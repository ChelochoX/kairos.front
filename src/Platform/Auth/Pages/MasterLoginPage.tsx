import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../App/Router/routes";
import { AlertMessage } from "../../../Shared/Components/ui/AlertMessage";
import { useForgotPassword } from "../Hooks/useForgotPassword";
import { useLogin } from "../Hooks/useLogin";

export const MasterLoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const {
    forgotPassword,
    loading: forgotLoading,
    error: forgotError,
    setError: setForgotError,
  } = useForgotPassword();

  const [identificador, setIdentificador] = useState("");
  const [clave, setClave] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successTitle, setSuccessTitle] = useState("");

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [usuarioRecuperacion, setUsuarioRecuperacion] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const identificadorLimpio = identificador.trim();
    const claveLimpia = clave.trim();

    setSuccessMessage("");
    setSuccessTitle("");

    if (!identificadorLimpio) {
      return;
    }

    if (!claveLimpia) {
      return;
    }

    const response = await login({
      identificador: identificadorLimpio,
      clave,
    });

    if (response) {
      setSuccessTitle("Bienvenido a Kairos Master");
      setSuccessMessage(
        `Hola ${response.nombre}, estamos preparando tu panel de administración...`,
      );

      setTimeout(() => {
        navigate(ROUTES.PLATFORM.DASHBOARD, { replace: true });
      }, 2500);
    }
  };

  const handleForgotPassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const usuarioLimpio = usuarioRecuperacion.trim();

    setForgotError(null);

    if (!usuarioLimpio) {
      setForgotError("Ingresá tu usuario para continuar.");
      return;
    }

    const response = await forgotPassword({
      usuario: usuarioLimpio,
    });

    if (response?.tokenRecuperacion) {
      setShowForgotPassword(false);
      setUsuarioRecuperacion("");

      navigate(
        `${ROUTES.AUTH.MASTER_RESET_PASSWORD}?token=${encodeURIComponent(
          response.tokenRecuperacion,
        )}`,
        { replace: true },
      );
    }
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setUsuarioRecuperacion("");
    setForgotError(null);
  };

  const isFormDisabled = loading || !!successMessage;

  return (
    <>
      <div className="w-full max-w-md rounded-[28px] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Plataforma administrativa
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Kairos Master
          </h1>

          <p className="mt-2 text-sm text-slate-500">Acceso al panel maestro</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="identificador"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Usuario o email
            </label>

            <input
              id="identificador"
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              disabled={isFormDisabled}
              placeholder="Ingresá tu usuario o email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>

          <div>
            <label
              htmlFor="clave"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Contraseña
            </label>

            <input
              id="clave"
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              disabled={isFormDisabled}
              placeholder="Ingresá tu contraseña"
              className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              ¿Olvidaste tu contraseña?
            </button>
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
            disabled={isFormDisabled}
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

      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-white px-8 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Recuperar contraseña
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Ingresá tu usuario para continuar con el cambio de contraseña.
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div>
                <label
                  htmlFor="usuarioRecuperacion"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Usuario
                </label>

                <input
                  id="usuarioRecuperacion"
                  type="text"
                  value={usuarioRecuperacion}
                  onChange={(e) => setUsuarioRecuperacion(e.target.value)}
                  disabled={forgotLoading}
                  placeholder="Ingresá tu usuario"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              {forgotError && (
                <AlertMessage
                  variant="error"
                  title="No pudimos continuar con la recuperación"
                  message={forgotError}
                />
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeForgotPassword}
                  disabled={forgotLoading}
                  className="w-1/2 rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-1/2 rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {forgotLoading ? "Procesando..." : "Solicitar cambio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
