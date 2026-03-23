export interface ModuloCatalogoDto {
  ModuloId?: number;
  CodigoModulo?: string;
  Nombre?: string;
  Descripcion?: string | null;
  Activo?: boolean;
  FechaRegistro?: string;
  FechaModificacion?: string | null;
}

export interface ModuloCatalogo {
  moduloId: number;
  codigoModulo: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  fechaRegistro: string;
  fechaModificacion: string;
}

export interface CrearModuloCatalogoRequest {
  codigoModulo: string;
  nombre: string;
  descripcion: string;
}

export interface ActualizarModuloCatalogoRequest {
  codigoModulo: string;
  nombre: string;
  descripcion: string;
}
