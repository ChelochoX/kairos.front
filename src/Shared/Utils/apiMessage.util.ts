const getUserVisibleError = (errors?: string[]): string | undefined => {
  if (!errors?.length) return undefined;

  return errors.find((error) => {
    const normalized = error.trim().toLowerCase();

    return (
      normalized.length > 0 &&
      !normalized.startsWith("module:") &&
      !normalized.startsWith("code:")
    );
  });
};

export const getFriendlyMessage = (
  statusCode?: number,
  message?: string,
  errors?: string[],
): string => {
  const userVisibleError = getUserVisibleError(errors);
  const rawMessage = (message || userVisibleError || "").toLowerCase();

  if (statusCode === 400) {
    if (rawMessage.includes("credenciales inválidas")) {
      return "Verificá tus datos e intentá nuevamente.";
    }

    return userVisibleError || message || "Hay datos que necesitan revisión.";
  }

  if (statusCode === 401) {
    if (rawMessage.includes("credenciales inválidas")) {
      return "Verificá tus datos e intentá nuevamente.";
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

  if (statusCode === 403) {
    return "No tenés permisos para realizar esta acción.";
  }

  if (statusCode === 404) {
    return "No encontramos la información solicitada.";
  }

  if (statusCode === 409) {
    return (
      userVisibleError || message || "Ya existe un registro con esos datos."
    );
  }

  if (statusCode === 500) {
    return "Ocurrió un inconveniente interno. Intentá nuevamente.";
  }

  return (
    userVisibleError ||
    message ||
    "Ocurrió un inconveniente. Intentá nuevamente."
  );
};
