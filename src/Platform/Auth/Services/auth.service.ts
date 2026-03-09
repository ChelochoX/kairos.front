import { API_ENDPOINTS } from "../../../Infrastructure/Api/endpoints";
import type { ApiResponse } from "../../../Shared/Types/api-response.types";
import { httpClient } from "../../../Infrastructure/Http/httpClient";
import type {
  LoginPlataformaRequest,
  LoginPlataformaResponse,
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
};
