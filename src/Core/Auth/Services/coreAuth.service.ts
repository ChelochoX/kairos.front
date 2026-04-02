import type {
  CoreLoginRequest,
  CoreLoginResponse,
  CoreMeResponse,
  CoreRefreshTokenRequest,
  CoreRefreshTokenResponse,
  EmpresaLoginItem,
} from "../Types/auth.types";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import { getApiErrorMessage } from "../../../Shared/Utils/apiError.util";
import { getFriendlyMessage } from "../../../Shared/Utils/apiMessage.util";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const CORE_AUTH_BASE_URL = `${API_URL}/api/v1/core/auth`;
const PLATFORM_EMPRESAS_BASE_URL = `${API_URL}/api/platform/Empresas`;

export const coreAuthService = {
  login: async (payload: CoreLoginRequest): Promise<CoreLoginResponse> => {
    const response = await fetch(`${CORE_AUTH_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await getApiErrorMessage(response));
    }

    return response.json();
  },

  listEmpresas: async (): Promise<EmpresaLoginItem[]> => {
    const response = await fetch(`${PLATFORM_EMPRESAS_BASE_URL}?activa=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(await getApiErrorMessage(response));
    }

    const result: ApiResponse<EmpresaLoginItem[]> = await response.json();

    if (!result.Success) {
      throw new Error(
        getFriendlyMessage(result.StatusCode, result.Message, result.Errors),
      );
    }

    return result.Data ?? [];
  },

  refresh: async (
    payload: CoreRefreshTokenRequest,
  ): Promise<CoreRefreshTokenResponse> => {
    const response = await fetch(`${CORE_AUTH_BASE_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await getApiErrorMessage(response));
    }

    return response.json();
  },

  logout: async (
    refreshToken?: string,
    accessToken?: string,
  ): Promise<void> => {
    const response = await fetch(`${CORE_AUTH_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(
        refreshToken
          ? {
              refreshToken,
            }
          : {},
      ),
    });

    if (!response.ok) {
      throw new Error(await getApiErrorMessage(response));
    }
  },

  me: async (accessToken: string): Promise<CoreMeResponse> => {
    const response = await fetch(`${CORE_AUTH_BASE_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(await getApiErrorMessage(response));
    }

    return response.json();
  },
};
