import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authStorage } from "../../Infrastructure/Storage/authStorage";
import type { LoginPlataformaResponse } from "../../Platform/Auth/Types/auth.types";

interface AuthState {
  token: string | null;
  user: LoginPlataformaResponse | null;
  isAuthenticated: boolean;
  setAuth: (data: LoginPlataformaResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(authStorage.getToken());
  const [user, setUser] = useState<LoginPlataformaResponse | null>(null);

  const setAuth = (data: LoginPlataformaResponse) => {
    authStorage.setToken(data.token);
    setToken(data.token);
    setUser(data);
  };

  const logout = () => {
    authStorage.removeToken();
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthState>(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      setAuth,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthStore = (): AuthState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthStore debe usarse dentro de AuthProvider");
  }

  return context;
};
