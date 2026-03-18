import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type {
  ActualizarEmpresaRequest,
  CrearEmpresaRequest,
  Empresa,
  EmpresaDto,
} from "../Types/empresa.types";

const mapEmpresaDtoToEmpresa = (dto: EmpresaDto): Empresa => ({
  empresaId: dto.empresaId,
  codigoEmpresa: dto.codigoEmpresa,
  nombreComercial: dto.nombreComercial,
  razonSocial: dto.razonSocial,
  rubro: dto.rubro,
  moneda: dto.moneda,
  whatsAppContacto: dto.whatsAppContacto,
  emailContacto: dto.emailContacto,
  logoPublicId: dto.logoPublicId,
  colorPrimario: dto.colorPrimario,
  colorSecundario: dto.colorSecundario,
  activa: dto.activa,
});

export const empresaService = {
  async getAll(activa?: boolean): Promise<Empresa[]> {
    const endpoint =
      activa === undefined
        ? API_ENDPOINTS.empresas.getAll
        : `${API_ENDPOINTS.empresas.getAll}?activa=${activa}`;

    const response = await httpClient.get<ApiResponse<EmpresaDto[]>>(endpoint);

    return response.data.Data.map(mapEmpresaDtoToEmpresa);
  },

  async getById(empresaId: number): Promise<Empresa> {
    const response = await httpClient.get<ApiResponse<EmpresaDto>>(
      `${API_ENDPOINTS.empresas.getAll}/${empresaId}`,
    );

    return mapEmpresaDtoToEmpresa(response.data.Data);
  },

  async create(payload: CrearEmpresaRequest): Promise<number> {
    const response = await httpClient.post<ApiResponse<{ EmpresaId: number }>>(
      API_ENDPOINTS.empresas.create,
      payload,
    );

    return response.data.Data.EmpresaId;
  },

  async update(
    empresaId: number,
    payload: ActualizarEmpresaRequest,
  ): Promise<void> {
    await httpClient.put(
      `${API_ENDPOINTS.empresas.getAll}/${empresaId}`,
      payload,
    );
  },

  async setActiva(empresaId: number, activa: boolean): Promise<void> {
    await httpClient.patch(
      `${API_ENDPOINTS.empresas.getAll}/${empresaId}/activar?activa=${activa}`,
    );
  },
};
