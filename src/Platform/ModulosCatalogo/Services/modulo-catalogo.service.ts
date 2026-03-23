import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import type {
  ActualizarModuloCatalogoRequest,
  CrearModuloCatalogoRequest,
  ModuloCatalogo,
  ModuloCatalogoDto,
} from "../Types/modulo-catalogo.types";

type ModuloCatalogoApiDto = ModuloCatalogoDto & {
  moduloId?: number;
  codigoModulo?: string;
  nombre?: string;
  descripcion?: string | null;
  activo?: boolean;
  fechaRegistro?: string;
  fechaModificacion?: string | null;
};

const mapDto = (dto: ModuloCatalogoApiDto): ModuloCatalogo => ({
  moduloId: dto.ModuloId ?? dto.moduloId ?? 0,
  codigoModulo: dto.CodigoModulo ?? dto.codigoModulo ?? "",
  nombre: dto.Nombre ?? dto.nombre ?? "",
  descripcion: dto.Descripcion ?? dto.descripcion ?? "",
  activo: dto.Activo ?? dto.activo ?? false,
  fechaRegistro: dto.FechaRegistro ?? dto.fechaRegistro ?? "",
  fechaModificacion: dto.FechaModificacion ?? dto.fechaModificacion ?? "",
});

export const moduloCatalogoService = {
  async getAll(activo?: boolean): Promise<ModuloCatalogo[]> {
    const endpoint =
      activo === undefined
        ? API_ENDPOINTS.modulosCatalogo.getAll
        : `${API_ENDPOINTS.modulosCatalogo.getAll}?activo=${activo}`;

    const response =
      await httpClient.get<ApiResponse<ModuloCatalogoApiDto[]>>(endpoint);

    return response.data.Data.map(mapDto);
  },

  async getById(moduloId: number): Promise<ModuloCatalogo> {
    const response = await httpClient.get<ApiResponse<ModuloCatalogoApiDto>>(
      API_ENDPOINTS.modulosCatalogo.getById(moduloId),
    );

    return mapDto(response.data.Data);
  },

  async create(payload: CrearModuloCatalogoRequest): Promise<number> {
    const response = await httpClient.post<
      ApiResponse<{
        ModuloId?: number;
        moduloId?: number;
      }>
    >(API_ENDPOINTS.modulosCatalogo.create, payload);

    return response.data.Data.ModuloId ?? response.data.Data.moduloId ?? 0;
  },

  async update(
    moduloId: number,
    payload: ActualizarModuloCatalogoRequest,
  ): Promise<void> {
    await httpClient.put(
      API_ENDPOINTS.modulosCatalogo.update(moduloId),
      payload,
    );
  },

  async setActivo(moduloId: number, activo: boolean): Promise<void> {
    await httpClient.patch(
      API_ENDPOINTS.modulosCatalogo.setActivo(moduloId, activo),
    );
  },
};
