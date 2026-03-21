import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import type {
  ActualizarUsuarioPlataformaRequest,
  CambiarClaveUsuarioPlataformaRequest,
  CrearUsuarioPlataformaRequest,
  RolPlataforma,
  RolPlataformaDto,
  UsuarioPlataforma,
  UsuarioPlataformaDto,
} from "../Types/usuario-plataforma.types";

type UsuarioPlataformaApiDto = UsuarioPlataformaDto & {
  usuarioPlataformaId?: number;
  nombre?: string;
  usuario?: string;
  email?: string | null;
  rol?: string;
  activo?: boolean;
  fechaRegistro?: string;
};

type RolPlataformaApiDto = RolPlataformaDto & {
  rolId?: number;
  codigoRol?: string;
  nombre?: string;
  esSuperAdmin?: boolean;
};

const mapDto = (dto: UsuarioPlataformaApiDto): UsuarioPlataforma => ({
  usuarioPlataformaId: dto.UsuarioPlataformaId ?? dto.usuarioPlataformaId ?? 0,
  nombre: dto.Nombre ?? dto.nombre ?? "",
  usuario: dto.Usuario ?? dto.usuario ?? "",
  email: dto.Email ?? dto.email ?? "",
  rol: dto.Rol ?? dto.rol ?? "",
  activo: dto.Activo ?? dto.activo ?? false,
  fechaRegistro: dto.FechaRegistro ?? dto.fechaRegistro ?? "",
});

const mapRolDto = (dto: RolPlataformaApiDto): RolPlataforma => ({
  rolId: dto.RolId ?? dto.rolId ?? 0,
  codigoRol: dto.CodigoRol ?? dto.codigoRol ?? "",
  nombre: dto.Nombre ?? dto.nombre ?? "",
  esSuperAdmin: dto.EsSuperAdmin ?? dto.esSuperAdmin ?? false,
});

export const usuarioPlataformaService = {
  async getAll(activo?: boolean): Promise<UsuarioPlataforma[]> {
    const endpoint =
      activo === undefined
        ? API_ENDPOINTS.usuariosPlataforma.getAll
        : `${API_ENDPOINTS.usuariosPlataforma.getAll}?activo=${activo}`;

    const response =
      await httpClient.get<ApiResponse<UsuarioPlataformaApiDto[]>>(endpoint);

    return response.data.Data.map(mapDto);
  },

  async getById(usuarioPlataformaId: number): Promise<UsuarioPlataforma> {
    const response = await httpClient.get<ApiResponse<UsuarioPlataformaApiDto>>(
      API_ENDPOINTS.usuariosPlataforma.getById(usuarioPlataformaId),
    );

    return mapDto(response.data.Data);
  },

  async getRoles(): Promise<RolPlataforma[]> {
    const response = await httpClient.get<ApiResponse<RolPlataformaApiDto[]>>(
      API_ENDPOINTS.usuariosPlataforma.roles,
    );

    return response.data.Data.map(mapRolDto);
  },

  async create(payload: CrearUsuarioPlataformaRequest): Promise<number> {
    const response = await httpClient.post<
      ApiResponse<{
        UsuarioPlataformaId?: number;
        usuarioPlataformaId?: number;
      }>
    >(API_ENDPOINTS.usuariosPlataforma.create, payload);

    return (
      response.data.Data.UsuarioPlataformaId ??
      response.data.Data.usuarioPlataformaId ??
      0
    );
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
