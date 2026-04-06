import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type {
  ForgotPasswordPlataformaRequest,
  ForgotPasswordPlataformaResponse,
  LoginPlataformaRequest,
  LoginPlataformaResponse,
  ResetPasswordPlataformaRequest,
} from "../Types/auth.types";

export const authService = {
  async login(
    payload: LoginPlataformaRequest,
  ): Promise<LoginPlataformaResponse> {
    const response = await httpClient.post<
      ApiResponse<LoginPlataformaResponse>
    >(API_ENDPOINTS.auth.login, payload);

    return response.data.Data;
  },

  async forgotPassword(
    payload: ForgotPasswordPlataformaRequest,
  ): Promise<ForgotPasswordPlataformaResponse> {
    const response = await httpClient.post<
      ApiResponse<ForgotPasswordPlataformaResponse>
    >(API_ENDPOINTS.auth.forgotPassword, payload);

    return response.data.Data;
  },

  async resetPassword(payload: ResetPasswordPlataformaRequest): Promise<void> {
    await httpClient.post<ApiResponse<null>>(
      API_ENDPOINTS.auth.resetPassword,
      payload,
    );
  },

  async logout(): Promise<void> {
    await httpClient.post<ApiResponse<null>>(API_ENDPOINTS.auth.logout);
  },
};
