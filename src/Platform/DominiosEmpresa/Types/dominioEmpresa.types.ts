export interface DominioEmpresaDto {
  dominioEmpresaId: number;
  empresaId: number;
  dominio: string;
  esPrincipal: boolean;
  activo: boolean;
  fechaRegistro: string;
  fechaModificacion?: string | null;
}

export interface DominioEmpresa {
  dominioEmpresaId: number;
  empresaId: number;
  dominio: string;
  esPrincipal: boolean;
  activo: boolean;
  fechaRegistro: string;
  fechaModificacion?: string | null;
}

export interface CrearDominioEmpresaRequest {
  dominio: string;
  esPrincipal: boolean;
}

export interface ActualizarDominioEmpresaRequest {
  dominio: string;
  esPrincipal: boolean;
}

export interface DominioEmpresaFormValues {
  dominio: string;
  esPrincipal: boolean;
}
