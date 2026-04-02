import type { CoreSession } from "../Types/auth.types";

const CORE_AUTH_STORAGE_KEY = "core_auth_session";

export const coreAuthStorage = {
  saveSession: (session: CoreSession) => {
    localStorage.setItem(CORE_AUTH_STORAGE_KEY, JSON.stringify(session));
  },

  getSession: (): CoreSession | null => {
    const raw = localStorage.getItem(CORE_AUTH_STORAGE_KEY);

    if (!raw) return null;

    try {
      return JSON.parse(raw) as CoreSession;
    } catch {
      localStorage.removeItem(CORE_AUTH_STORAGE_KEY);
      return null;
    }
  },

  clearSession: () => {
    localStorage.removeItem(CORE_AUTH_STORAGE_KEY);
  },

  getAccessToken: (): string | null => {
    return coreAuthStorage.getSession()?.accessToken ?? null;
  },

  getRefreshToken: (): string | null => {
    return coreAuthStorage.getSession()?.refreshToken ?? null;
  },

  getEmpresaId: (): number | null => {
    return coreAuthStorage.getSession()?.empresaId ?? null;
  },

  isAuthenticated: (): boolean => {
    const session = coreAuthStorage.getSession();

    if (!session?.accessToken) return false;

    return true;
  },
};
