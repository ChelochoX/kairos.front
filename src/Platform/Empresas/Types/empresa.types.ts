export interface EmpresaDto {
  empresaId: number;
  codigoEmpresa: string;
  nombreComercial: string;
  rubro: string;
  activa: boolean;
}

export interface Empresa {
  empresaId: number;
  codigoEmpresa: string;
  nombreComercial: string;
  rubro: string;
  activa: boolean;
}

export interface CrearEmpresaRequest {
  codigoEmpresa: string;
  nombreComercial: string;
  razonSocial?: string;
  rubro: string;
  moneda?: string;
  whatsAppContacto?: string;
  emailContacto?: string;
}

export interface ActualizarEmpresaRequest {
  nombreComercial: string;
  razonSocial?: string;
  rubro: string;
  moneda?: string;
  whatsAppContacto?: string;
  emailContacto?: string;
  logoPublicId?: string;
  colorPrimario?: string;
  colorSecundario?: string;
}

export type FiltroActiva = "todas" | "activas" | "inactivas";
