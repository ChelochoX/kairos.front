import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import type {
  ActualizarBaseDatosEmpresaRequest,
  BaseDatosEmpresa,
  BaseDatosEmpresaDto,
  CrearBaseDatosEmpresaRequest,
} from "../Types/baseDatosEmpresa.types";

const mapBaseDatosEmpresaDtoToModel = (
  dto: BaseDatosEmpresaDto,
): BaseDatosEmpresa => ({
  baseDatosEmpresaId: dto.baseDatosEmpresaId,
  empresaId: dto.empresaId,
  nombreConexion: dto.nombreConexion,
  cadenaConexion: dto.cadenaConexion,
  proveedor: dto.proveedor,
  esPrincipal: dto.esPrincipal,
  activo: dto.activo,
  fechaRegistro: dto.fechaRegistro,
  fechaModificacion: dto.fechaModificacion,
});

export const basesDatosEmpresaService = {
  async getAll(empresaId: number): Promise<BaseDatosEmpresa[]> {
    const response = await httpClient.get<ApiResponse<BaseDatosEmpresaDto[]>>(
      API_ENDPOINTS.basesDatosEmpresa.getAll(empresaId),
    );

    return response.data.Data.map(mapBaseDatosEmpresaDtoToModel);
  },

  async getById(
    empresaId: number,
    baseDatosEmpresaId: number,
  ): Promise<BaseDatosEmpresa> {
    const response = await httpClient.get<ApiResponse<BaseDatosEmpresaDto>>(
      API_ENDPOINTS.basesDatosEmpresa.getById(empresaId, baseDatosEmpresaId),
    );

    return mapBaseDatosEmpresaDtoToModel(response.data.Data);
  },

  async create(
    empresaId: number,
    payload: CrearBaseDatosEmpresaRequest,
  ): Promise<number> {
    const response = await httpClient.post<
      ApiResponse<{ BaseDatosEmpresaId: number }>
    >(API_ENDPOINTS.basesDatosEmpresa.create(empresaId), payload);

    return response.data.Data.BaseDatosEmpresaId;
  },

  async update(
    empresaId: number,
    baseDatosEmpresaId: number,
    payload: ActualizarBaseDatosEmpresaRequest,
  ): Promise<void> {
    await httpClient.put(
      API_ENDPOINTS.basesDatosEmpresa.update(empresaId, baseDatosEmpresaId),
      payload,
    );
  },

  async setActivo(
    empresaId: number,
    baseDatosEmpresaId: number,
    activo: boolean,
  ): Promise<void> {
    await httpClient.patch(
      API_ENDPOINTS.basesDatosEmpresa.setActivo(
        empresaId,
        baseDatosEmpresaId,
        activo,
      ),
    );
  },

  async setPrincipal(
    empresaId: number,
    baseDatosEmpresaId: number,
    esPrincipal: boolean,
  ): Promise<void> {
    await httpClient.patch(
      API_ENDPOINTS.basesDatosEmpresa.setPrincipal(
        empresaId,
        baseDatosEmpresaId,
        esPrincipal,
      ),
    );
  },

  async delete(empresaId: number, baseDatosEmpresaId: number): Promise<void> {
    await httpClient.delete(
      API_ENDPOINTS.basesDatosEmpresa.delete(empresaId, baseDatosEmpresaId),
    );
  },
};
