import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type {
  ActualizarDominioEmpresaRequest,
  CrearDominioEmpresaRequest,
  DominioEmpresa,
  DominioEmpresaDto,
} from "../Types/dominioEmpresa.types";

const mapDominioEmpresaDtoToDominioEmpresa = (
  dto: DominioEmpresaDto,
): DominioEmpresa => ({
  dominioEmpresaId: dto.dominioEmpresaId,
  empresaId: dto.empresaId,
  dominio: dto.dominio,
  esPrincipal: dto.esPrincipal,
  activo: dto.activo,
  fechaRegistro: dto.fechaRegistro,
  fechaModificacion: dto.fechaModificacion,
});

export const dominiosEmpresaService = {
  async getAll(empresaId: number): Promise<DominioEmpresa[]> {
    const response = await httpClient.get<ApiResponse<DominioEmpresaDto[]>>(
      API_ENDPOINTS.dominiosEmpresa.getAll(empresaId),
    );

    return response.data.Data.map(mapDominioEmpresaDtoToDominioEmpresa);
  },

  async getById(
    empresaId: number,
    dominioEmpresaId: number,
  ): Promise<DominioEmpresa> {
    const response = await httpClient.get<ApiResponse<DominioEmpresaDto>>(
      API_ENDPOINTS.dominiosEmpresa.getById(empresaId, dominioEmpresaId),
    );

    return mapDominioEmpresaDtoToDominioEmpresa(response.data.Data);
  },

  async create(
    empresaId: number,
    payload: CrearDominioEmpresaRequest,
  ): Promise<number> {
    const response = await httpClient.post<
      ApiResponse<{ DominioEmpresaId: number }>
    >(API_ENDPOINTS.dominiosEmpresa.create(empresaId), payload);

    return response.data.Data.DominioEmpresaId;
  },

  async update(
    empresaId: number,
    dominioEmpresaId: number,
    payload: ActualizarDominioEmpresaRequest,
  ): Promise<void> {
    await httpClient.put(
      API_ENDPOINTS.dominiosEmpresa.update(empresaId, dominioEmpresaId),
      payload,
    );
  },

  async setActivo(
    empresaId: number,
    dominioEmpresaId: number,
    activo: boolean,
  ): Promise<void> {
    await httpClient.patch(
      API_ENDPOINTS.dominiosEmpresa.setActivo(
        empresaId,
        dominioEmpresaId,
        activo,
      ),
    );
  },

  async setPrincipal(
    empresaId: number,
    dominioEmpresaId: number,
    esPrincipal: boolean,
  ): Promise<void> {
    await httpClient.patch(
      API_ENDPOINTS.dominiosEmpresa.setPrincipal(
        empresaId,
        dominioEmpresaId,
        esPrincipal,
      ),
    );
  },

  async delete(empresaId: number, dominioEmpresaId: number): Promise<void> {
    await httpClient.delete(
      API_ENDPOINTS.dominiosEmpresa.delete(empresaId, dominioEmpresaId),
    );
  },
};
