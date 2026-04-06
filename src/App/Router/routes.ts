export const ROUTES = {
  AUTH: {
    CORE_LOGIN: "/auth/core/login",
    MASTER_LOGIN: "/auth/platform/login",
    MASTER_RESET_PASSWORD: "/auth/platform/reset-password",
  },
  CORE: {
    DASHBOARD: "/core/dashboard",
    EMPRESAS: "/core/empresas",
    USUARIOS_PLATAFORMA: "/core/usuarios-plataforma",
    MODULOS_CATALOGO: "/core/modulos-catalogo",
    MODULOS_EMPRESA: "/core/modulos-empresa",
    DOMINIOS_EMPRESA: "/core/dominios-empresa",
    BASES_DATOS_EMPRESA: "/core/bases-datos-empresa",
  },
  PLATFORM: {
    DASHBOARD: "/platform/dashboard",
  },
} as const;
