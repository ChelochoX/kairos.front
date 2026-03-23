import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import type {
  AsignarModuloEmpresaRequest,
  ModuloEmpresa,
  ModuloEmpresaDto,
} from "../Types/modulo-empresa.types";

type ModuloEmpresaApiDto = ModuloEmpresaDto & {
  moduloEmpresaId?: number;
  empresaId?: number;
  moduloId?: number;
  codigoModulo?: string;
  nombreModulo?: string;
  descripcionModulo?: string | null;
  activo?: boolean;
  fechaHabilitado?: string;
  fechaModificacion?: string | null;
};

const mapDto = (dto: ModuloEmpresaApiDto): ModuloEmpresa => ({
  moduloEmpresaId: dto.ModuloEmpresaId ?? dto.moduloEmpresaId ?? 0,
  empresaId: dto.EmpresaId ?? dto.empresaId ?? 0,
  moduloId: dto.ModuloId ?? dto.moduloId ?? 0,
  codigoModulo: dto.CodigoModulo ?? dto.codigoModulo ?? "",
  nombreModulo: dto.NombreModulo ?? dto.nombreModulo ?? "",
  descripcionModulo: dto.DescripcionModulo ?? dto.descripcionModulo ?? "",
  activo: dto.Activo ?? dto.activo ?? false,
  fechaHabilitado: dto.FechaHabilitado ?? dto.fechaHabilitado ?? "",
  fechaModificacion: dto.FechaModificacion ?? dto.fechaModificacion ?? "",
});

export const moduloEmpresaService = {
  async getAll(empresaId: number): Promise<ModuloEmpresa[]> {
    const response = await httpClient.get<ApiResponse<ModuloEmpresaApiDto[]>>(
      API_ENDPOINTS.modulosEmpresa.getAll(empresaId),
    );

    return response.data.Data.map(mapDto);
  },

  async getById(
    empresaId: number,
    moduloEmpresaId: number,
  ): Promise<ModuloEmpresa> {
    const response = await httpClient.get<ApiResponse<ModuloEmpresaApiDto>>(
      API_ENDPOINTS.modulosEmpresa.getById(empresaId, moduloEmpresaId),
    );

    return mapDto(response.data.Data);
  },

  async create(
    empresaId: number,
    payload: AsignarModuloEmpresaRequest,
  ): Promise<number> {
    const response = await httpClient.post<
      ApiResponse<{
        ModuloEmpresaId?: number;
        moduloEmpresaId?: number;
      }>
    >(API_ENDPOINTS.modulosEmpresa.create(empresaId), payload);

    return (
      response.data.Data.ModuloEmpresaId ??
      response.data.Data.moduloEmpresaId ??
      0
    );
  },

  async setActivo(
    empresaId: number,
    moduloEmpresaId: number,
    activo: boolean,
  ): Promise<void> {
    await httpClient.patch(
      API_ENDPOINTS.modulosEmpresa.setActivo(
        empresaId,
        moduloEmpresaId,
        activo,
      ),
    );
  },

  async delete(empresaId: number, moduloEmpresaId: number): Promise<void> {
    await httpClient.delete(
      API_ENDPOINTS.modulosEmpresa.delete(empresaId, moduloEmpresaId),
    );
  },
};
