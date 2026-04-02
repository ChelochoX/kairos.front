export interface CoreLoginRequest {
  empresaId: number;
  login: string;
  password: string;
}

export interface CoreRefreshTokenRequest {
  empresaId: number;
  refreshToken: string;
}

export interface UsuarioSesionResponse {
  usuarioEmpresaId: number;
  codigoUsuario: string;
  nombreCompleto: string;
  email: string;
  username: string;
  debeCambiarClave: boolean;
}

export interface CoreLoginResponse {
  accessToken: string;
  refreshToken: string;
  expiraEnUtc: string;
  empresaId: number;
  usuario: UsuarioSesionResponse;
  roles: string[];
  permisos: string[];
  modulos: string[];
}

export interface CoreRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiraEnUtc: string;
}

export interface CoreMeResponse {
  empresaId: number;
  usuario: UsuarioSesionResponse;
  roles: string[];
  permisos: string[];
  modulos: string[];
}

export interface CoreSession {
  empresaId: number;
  accessToken: string;
  refreshToken: string;
  expiraEnUtc: string;
  usuario: UsuarioSesionResponse;
  roles: string[];
  permisos: string[];
  modulos: string[];
}

export interface EmpresaLoginItem {
  empresaId: number;
  codigoEmpresa: string;
  nombreComercial: string;
}
