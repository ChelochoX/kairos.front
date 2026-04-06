export interface LoginPlataformaRequest {
  identificador: string;
  clave: string;
}

export interface LoginPlataformaResponse {
  token: string;
  expiraEnUtc: string;
  usuarioPlataformaId: number;
  nombre: string;
  usuario: string;
  email?: string | null;
  rol: string;
}

export interface ForgotPasswordPlataformaRequest {
  usuario: string;
}

export interface ForgotPasswordPlataformaResponse {
  mensaje: string;
  tokenRecuperacion?: string | null;
}

export interface ResetPasswordPlataformaRequest {
  token: string;
  nuevaClave: string;
  confirmarNuevaClave: string;
}
