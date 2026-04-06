import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../App/Router/routes";
import { AlertMessage } from "../../../Shared/Components/ui/AlertMessage";
import { useResetPassword } from "../Hooks/useResetPassword";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, loading, error, setError } = useResetPassword();

  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarNuevaClave, setConfirmarNuevaClave] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setSuccessMessage("");

    if (!token.trim()) {
      setError("No se encontró un token de recuperación válido.");
      return;
    }

    if (!nuevaClave.trim()) {
      setError("Ingresá la nueva contraseña.");
      return;
    }

    if (!confirmarNuevaClave.trim()) {
      setError("Confirmá la nueva contraseña.");
      return;
    }

    if (nuevaClave !== confirmarNuevaClave) {
      setError("La confirmación de contraseña no coincide.");
      return;
    }

    const ok = await resetPassword({
      token,
      nuevaClave,
      confirmarNuevaClave,
    });

    if (ok) {
      setSuccessMessage(
        "La contraseña fue actualizada correctamente. En unos segundos te redirigiremos al login.",
      );

      setTimeout(() => {
        navigate(ROUTES.AUTH.MASTER_LOGIN, { replace: true });
      }, 2500);
    }
  };

  const isFormDisabled = loading || !!successMessage;

  return (
    <div className="w-full max-w-md rounded-[28px] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
      <div className="mb-8 text-center">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Seguridad de acceso
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
          Nueva contraseña
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Definí una nueva contraseña para tu cuenta de Kairos Master.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="nuevaClave"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Nueva contraseña
          </label>

          <input
            id="nuevaClave"
            type="password"
            value={nuevaClave}
            onChange={(e) => setNuevaClave(e.target.value)}
            disabled={isFormDisabled}
            placeholder="Ingresá tu nueva contraseña"
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>

        <div>
          <label
            htmlFor="confirmarNuevaClave"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Confirmar contraseña
          </label>

          <input
            id="confirmarNuevaClave"
            type="password"
            value={confirmarNuevaClave}
            onChange={(e) => setConfirmarNuevaClave(e.target.value)}
            disabled={isFormDisabled}
            placeholder="Confirmá tu nueva contraseña"
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>

        {error && !successMessage && (
          <AlertMessage
            variant="error"
            title="Revisá los datos ingresados"
            message={error}
          />
        )}

        {successMessage && (
          <AlertMessage
            variant="success"
            title="Contraseña actualizada"
            message={successMessage}
          />
        )}

        <button
          type="submit"
          disabled={isFormDisabled}
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {successMessage
            ? "Redirigiendo..."
            : loading
              ? "Actualizando..."
              : "Guardar nueva contraseña"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => navigate(ROUTES.AUTH.MASTER_LOGIN, { replace: true })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Volver al login
        </button>
      </form>
    </div>
  );
};
