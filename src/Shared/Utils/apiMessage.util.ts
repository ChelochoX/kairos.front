export const getFriendlyMessage = (
  statusCode?: number,
  message?: string,
  errors?: string[],
): string => {
  const rawMessage = (message || errors?.[0] || "").toLowerCase();

  if (statusCode === 401) {
    if (rawMessage.includes("credenciales inválidas")) {
      return "Verificá tu empresa, usuario y contraseña e intentá nuevamente.";
    }

    if (rawMessage.includes("usuario bloqueado")) {
      return "Tu cuenta se encuentra bloqueada. Contactá al administrador.";
    }

    if (rawMessage.includes("usuario inactivo")) {
      return "Tu usuario se encuentra inactivo. Contactá al administrador.";
    }

    if (rawMessage.includes("módulos habilitados")) {
      return "Tu cuenta no tiene módulos habilitados para ingresar.";
    }

    return "No tenés autorización para realizar esta acción.";
  }

  if (statusCode === 400) {
    return message || errors?.[0] || "Hay datos que necesitan revisión.";
  }

  if (statusCode === 403) {
    return "No tenés permisos para realizar esta acción.";
  }

  if (statusCode === 404) {
    return "No encontramos la información solicitada.";
  }

  if (statusCode === 409) {
    return message || "Ya existe un registro con esos datos.";
  }

  if (statusCode === 500) {
    return "Ocurrió un inconveniente interno. Intentá nuevamente.";
  }

  return (
    message || errors?.[0] || "Ocurrió un inconveniente. Intentá nuevamente."
  );
};
