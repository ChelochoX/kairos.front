import type { ApiResponse } from "../Types/api-response.types";
import { getFriendlyMessage } from "./apiMessage.util";

export const getApiErrorMessage = async (
  response: Response,
): Promise<string> => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const errorBody: ApiResponse<null> = await response.json();

      return getFriendlyMessage(
        errorBody.StatusCode,
        errorBody.Message,
        errorBody.Errors,
      );
    } catch {
      return "Ocurrió un inconveniente al procesar la respuesta del servidor.";
    }
  }

  try {
    const text = await response.text();
    return text || "Ocurrió un inconveniente al comunicarse con el servidor.";
  } catch {
    return "Ocurrió un inconveniente al comunicarse con el servidor.";
  }
};
