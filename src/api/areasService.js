import { apiClient } from "./client";
import { normalizeRecipe } from "./recipesService";

export const areasService = {
  getAll: async () => {
    const { data } = await apiClient.get("/recipes?limit=0&select=cuisine");
    return { meals: [...new Set(data.recipes.map((item) => item.cuisine))].sort().map((strArea) => ({ strArea })) };
  },
  getMealsByArea: async (area) => {
    const { data } = await apiClient.get("/recipes?limit=0");
    return { meals: data.recipes.filter((item) => item.cuisine === area).map(normalizeRecipe) };
  },
};
