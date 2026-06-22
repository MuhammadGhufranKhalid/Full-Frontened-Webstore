// src/api/areasService.js
// Cuisine/area list + filtering meals by area (country/region).

import { apiClient } from "./client";

export const areasService = {
  getAll: () => apiClient.get(`/list.php?a=list`),
  getMealsByArea: (area) =>
    apiClient.get(`/filter.php?a=${encodeURIComponent(area)}`),
};
