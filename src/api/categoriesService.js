// src/api/categoriesService.js
// Category list + filtering meals by category.

import { apiClient } from "./client";

export const categoriesService = {
  getAll: () => apiClient.get(`/categories.php`),
  getMealsByCategory: (category) =>
    apiClient.get(`/filter.php?c=${encodeURIComponent(category)}`),
};
