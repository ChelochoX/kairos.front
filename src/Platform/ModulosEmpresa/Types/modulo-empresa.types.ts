export interface ModuloEmpresaDto {
  ModuloEmpresaId?: number;
  EmpresaId?: number;
  ModuloId?: number;
  CodigoModulo?: string;
  NombreModulo?: string;
  DescripcionModulo?: string | null;
  Activo?: boolean;
  FechaAsignacion?: string;
  FechaModificacion?: string | null;
}

export interface ModuloEmpresa {
  moduloEmpresaId: number;
  empresaId: number;
  moduloId: number;
  codigoModulo: string;
  nombreModulo: string;
  descripcionModulo: string;
  activo: boolean;
  fechaAsignacion: string;
  fechaModificacion: string;
}
export interface AsignarModuloEmpresaRequest {
  moduloId: number;
}

export interface ModuloCatalogoOption {
  moduloId: number;
  codigoModulo: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}
