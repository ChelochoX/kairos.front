export interface BaseDatosEmpresaDto {
  baseDatosEmpresaId: number;
  empresaId: number;
  nombreConexion: string;
  cadenaConexion: string;
  proveedor: string;
  esPrincipal: boolean;
  activo: boolean;
  fechaRegistro: string;
  fechaModificacion?: string | null;
}

export interface BaseDatosEmpresa {
  baseDatosEmpresaId: number;
  empresaId: number;
  nombreConexion: string;
  cadenaConexion: string;
  proveedor: string;
  esPrincipal: boolean;
  activo: boolean;
  fechaRegistro: string;
  fechaModificacion?: string | null;
}

export interface CrearBaseDatosEmpresaRequest {
  nombreConexion: string;
  cadenaConexion: string;
  proveedor: string;
  esPrincipal: boolean;
}

export interface ActualizarBaseDatosEmpresaRequest {
  nombreConexion: string;
  cadenaConexion: string;
  proveedor: string;
  esPrincipal: boolean;
}

export interface BaseDatosEmpresaFormValues {
  nombreConexion: string;
  cadenaConexion: string;
  proveedor: string;
  esPrincipal: boolean;
}
