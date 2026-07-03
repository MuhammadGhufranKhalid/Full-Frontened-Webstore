import { apiClient } from "./client";

export const usersService = {
  getAll: async () => (await apiClient.get("/users?limit=30")).data,
  create: async (user) => (await apiClient.post("/users/add", user)).data,
  update: async (id, user) => (await apiClient.put(`/users/${id}`, user)).data,
  remove: async (id) => (await apiClient.delete(`/users/${id}`)).data,
};
