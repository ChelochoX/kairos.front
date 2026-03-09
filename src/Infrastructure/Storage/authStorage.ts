const TOKEN_KEY = "kairos_platform_token";

export const authStorage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
};
