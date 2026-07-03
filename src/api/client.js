import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem("kitchen-notes:auth") || "null");
  if (session?.accessToken) config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(error.response?.data?.message || error.message || "Request failed.")),
);
