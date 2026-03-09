import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type {
  CrearEmpresaRequest,
  Empresa,
  EmpresaDto,
} from "../Types/empresa.types";

const mapEmpresaDtoToEmpresa = (dto: EmpresaDto): Empresa => ({
  empresaId: dto.empresaId,
  codigoEmpresa: dto.codigoEmpresa,
  nombreComercial: dto.nombreComercial,
  rubro: dto.rubro,
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

  async create(payload: CrearEmpresaRequest): Promise<number> {
    const response = await httpClient.post<ApiResponse<{ empresaId: number }>>(
      API_ENDPOINTS.empresas.create,
      payload,
    );

    return response.data.Data.empresaId;
  },
};
