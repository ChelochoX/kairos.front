import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import type {
  ActualizarUsuarioPlataformaRequest,
  CambiarClaveUsuarioPlataformaRequest,
  CrearUsuarioPlataformaRequest,
  UsuarioPlataforma,
  UsuarioPlataformaDto,
} from "../Types/usuario-plataforma.types";

const mapDto = (dto: UsuarioPlataformaDto): UsuarioPlataforma => ({
  usuarioPlataformaId: dto.UsuarioPlataformaId,
  nombre: dto.Nombre,
  usuario: dto.Usuario,
  email: dto.Email,
  rol: dto.Rol,
  activo: dto.Activo,
  fechaRegistro: dto.FechaRegistro,
});

export const usuarioPlataformaService = {
  async getAll(activo?: boolean): Promise<UsuarioPlataforma[]> {
    const endpoint =
      activo === undefined
        ? API_ENDPOINTS.usuariosPlataforma.getAll
        : `${API_ENDPOINTS.usuariosPlataforma.getAll}?activo=${activo}`;

    const response =
      await httpClient.get<ApiResponse<UsuarioPlataformaDto[]>>(endpoint);

    return response.data.Data.map(mapDto);
  },

  async getById(usuarioPlataformaId: number): Promise<UsuarioPlataforma> {
    const response = await httpClient.get<ApiResponse<UsuarioPlataformaDto>>(
      API_ENDPOINTS.usuariosPlataforma.getById(usuarioPlataformaId),
    );

    return mapDto(response.data.Data);
  },

  async create(payload: CrearUsuarioPlataformaRequest): Promise<number> {
    const response = await httpClient.post<
      ApiResponse<{ UsuarioPlataformaId: number }>
    >(API_ENDPOINTS.usuariosPlataforma.create, payload);

    return response.data.Data.UsuarioPlataformaId;
  },

  async update(
    usuarioPlataformaId: number,
    payload: ActualizarUsuarioPlataformaRequest,
  ): Promise<void> {
    await httpClient.put(
      API_ENDPOINTS.usuariosPlataforma.update(usuarioPlataformaId),
      payload,
    );
  },

  async setActivo(usuarioPlataformaId: number, activo: boolean): Promise<void> {
    await httpClient.patch(
      API_ENDPOINTS.usuariosPlataforma.setActivo(usuarioPlataformaId, activo),
    );
  },

  async cambiarClave(
    usuarioPlataformaId: number,
    payload: CambiarClaveUsuarioPlataformaRequest,
  ): Promise<void> {
    await httpClient.patch(
      API_ENDPOINTS.usuariosPlataforma.cambiarClave(usuarioPlataformaId),
      payload,
    );
  },
};
