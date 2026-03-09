import axios from "axios";
import { env } from "../Config/env";
import { authStorage } from "../Storage/authStorage";

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.removeToken();
    }

    return Promise.reject(error);
  },
);
