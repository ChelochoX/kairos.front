export type FiltroActivo = "todos" | "activos" | "inactivos";

export interface UsuarioPlataformaDto {
  UsuarioPlataformaId: number;
  Nombre: string;
  Usuario: string;
  Email?: string | null;
  Rol: string;
  Activo: boolean;
  FechaRegistro: string;
}

export interface UsuarioPlataforma {
  usuarioPlataformaId: number;
  nombre: string;
  usuario: string;
  email?: string | null;
  rol: string;
  activo: boolean;
  fechaRegistro: string;
}

export interface CrearUsuarioPlataformaRequest {
  nombre: string;
  usuario: string;
  email?: string | null;
  clave: string;
  rol: string;
}

export interface ActualizarUsuarioPlataformaRequest {
  nombre: string;
  usuario: string;
  email?: string | null;
  rol: string;
}

export interface CambiarClaveUsuarioPlataformaRequest {
  nuevaClave: string;
  confirmarNuevaClave: string;
}
