import { apiClient } from "./client";

export const authService = {
  login: async (credentials) => (await apiClient.post("/auth/login", { ...credentials, expiresInMins: 60 })).data,
  getProfile: async () => (await apiClient.get("/auth/me")).data,
};
