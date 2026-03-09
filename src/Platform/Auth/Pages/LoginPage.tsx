import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Hooks/useLogin";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const [identificador, setIdentificador] = useState("");
  const [clave, setClave] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    const response = await login({
      identificador,
      clave,
    });

    if (response) {
      setSuccessMessage(`Bienvenido, ${response.nombre}`);
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Kairos
          </h1>
          <p className="mt-2 text-sm text-slate-500">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="identificador"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Usuario o Email
            </label>
            <input
              id="identificador"
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              placeholder="Ingresa tu usuario o email"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="clave"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Clave
            </label>
            <input
              id="clave"
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Ingresa tu clave"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};
