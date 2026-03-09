export const API_ENDPOINTS = {
  auth: {
    login: "/api/platform/auth/login",
  },

  empresas: {
    create: "/api/platform/empresas",
    getAll: "/api/platform/empresas",
    getById: (empresaId: number | string) =>
      `/api/platform/empresas/${empresaId}`,
    update: (empresaId: number | string) =>
      `/api/platform/empresas/${empresaId}`,
    setActiva: (empresaId: number | string, activa: boolean) =>
      `/api/platform/empresas/${empresaId}/activar?activa=${activa}`,
  },

  usuariosPlataforma: {
    create: "/api/platform/usuariosplataforma",
    getAll: "/api/platform/usuariosplataforma",
    getById: (usuarioPlataformaId: number | string) =>
      `/api/platform/usuariosplataforma/${usuarioPlataformaId}`,
    update: (usuarioPlataformaId: number | string) =>
      `/api/platform/usuariosplataforma/${usuarioPlataformaId}`,
    setActivo: (usuarioPlataformaId: number | string, activo: boolean) =>
      `/api/platform/usuariosplataforma/${usuarioPlataformaId}/activo?activo=${activo}`,
    cambiarClave: (usuarioPlataformaId: number | string) =>
      `/api/platform/usuariosplataforma/${usuarioPlataformaId}/clave`,
  },

  modulosCatalogo: {
    create: "/api/platform/moduloscatalogo",
    getAll: "/api/platform/moduloscatalogo",
    getById: (moduloId: number | string) =>
      `/api/platform/moduloscatalogo/${moduloId}`,
    update: (moduloId: number | string) =>
      `/api/platform/moduloscatalogo/${moduloId}`,
    setActivo: (moduloId: number | string, activo: boolean) =>
      `/api/platform/moduloscatalogo/${moduloId}/activo?activo=${activo}`,
  },

  modulosEmpresa: {
    create: (empresaId: number | string) =>
      `/api/platform/modulosempresa?empresaId=${empresaId}`,
    getAll: (empresaId: number | string) =>
      `/api/platform/modulosempresa?empresaId=${empresaId}`,
    getById: (empresaId: number | string, moduloEmpresaId: number | string) =>
      `/api/platform/modulosempresa/${moduloEmpresaId}?empresaId=${empresaId}`,
    setActivo: (
      empresaId: number | string,
      moduloEmpresaId: number | string,
      activo: boolean,
    ) =>
      `/api/platform/modulosempresa/${moduloEmpresaId}/activo?empresaId=${empresaId}&activo=${activo}`,
    delete: (empresaId: number | string, moduloEmpresaId: number | string) =>
      `/api/platform/modulosempresa/${moduloEmpresaId}?empresaId=${empresaId}`,
  },

  dominiosEmpresa: {
    create: (empresaId: number | string) =>
      `/api/platform/dominiosempresa?empresaId=${empresaId}`,
    getAll: (empresaId: number | string) =>
      `/api/platform/dominiosempresa?empresaId=${empresaId}`,
    getById: (empresaId: number | string, dominioEmpresaId: number | string) =>
      `/api/platform/dominiosempresa/${dominioEmpresaId}?empresaId=${empresaId}`,
    update: (empresaId: number | string, dominioEmpresaId: number | string) =>
      `/api/platform/dominiosempresa/${dominioEmpresaId}?empresaId=${empresaId}`,
    setActivo: (
      empresaId: number | string,
      dominioEmpresaId: number | string,
      activo: boolean,
    ) =>
      `/api/platform/dominiosempresa/${dominioEmpresaId}/activo?empresaId=${empresaId}&activo=${activo}`,
    setPrincipal: (
      empresaId: number | string,
      dominioEmpresaId: number | string,
      esPrincipal: boolean,
    ) =>
      `/api/platform/dominiosempresa/${dominioEmpresaId}/principal?empresaId=${empresaId}&esPrincipal=${esPrincipal}`,
    delete: (empresaId: number | string, dominioEmpresaId: number | string) =>
      `/api/platform/dominiosempresa/${dominioEmpresaId}?empresaId=${empresaId}`,
  },

  basesDatosEmpresa: {
    create: (empresaId: number | string) =>
      `/api/platform/basesdatosempresa?empresaId=${empresaId}`,
    getAll: (empresaId: number | string) =>
      `/api/platform/basesdatosempresa?empresaId=${empresaId}`,
    getById: (
      empresaId: number | string,
      baseDatosEmpresaId: number | string,
    ) =>
      `/api/platform/basesdatosempresa/${baseDatosEmpresaId}?empresaId=${empresaId}`,
    update: (empresaId: number | string, baseDatosEmpresaId: number | string) =>
      `/api/platform/basesdatosempresa/${baseDatosEmpresaId}?empresaId=${empresaId}`,
    setActivo: (
      empresaId: number | string,
      baseDatosEmpresaId: number | string,
      activo: boolean,
    ) =>
      `/api/platform/basesdatosempresa/${baseDatosEmpresaId}/activo?empresaId=${empresaId}&activo=${activo}`,
    setPrincipal: (
      empresaId: number | string,
      baseDatosEmpresaId: number | string,
      esPrincipal: boolean,
    ) =>
      `/api/platform/basesdatosempresa/${baseDatosEmpresaId}/principal?empresaId=${empresaId}&esPrincipal=${esPrincipal}`,
    delete: (empresaId: number | string, baseDatosEmpresaId: number | string) =>
      `/api/platform/basesdatosempresa/${baseDatosEmpresaId}?empresaId=${empresaId}`,
  },
};
