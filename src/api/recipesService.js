// src/api/recipesService.js
// Core recipe endpoints: search by name, lookup by id, random pick.

import { apiClient } from "./client";

export const recipesService = {
  searchByName: (name) =>
    apiClient.get(`/search.php?s=${encodeURIComponent(name)}`),

  getById: (id) => apiClient.get(`/lookup.php?i=${id}`),

  getRandom: () => apiClient.get(`/random.php`),

  // fetch several distinct random meals (used on the home page)
  getRandomBatch: async (count = 8) => {
    const requests = Array.from({ length: count }, () =>
      apiClient.get(`/random.php`)
    );
    const results = await Promise.all(requests);
    const meals = results.map((r) => r.meals[0]);
    // de-dupe in case the API returns the same meal twice
    const seen = new Set();
    return meals.filter((m) => {
      if (seen.has(m.idMeal)) return false;
      seen.add(m.idMeal);
      return true;
    });
  },
};
