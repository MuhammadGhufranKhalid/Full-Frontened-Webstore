import { apiClient } from "./client";
import { normalizeRecipe } from "./recipesService";

export const categoriesService = {
  getAll: async () => {
    const { data } = await apiClient.get("/recipes/tags");
    return { categories: data.map((name, id) => ({ idCategory: String(id + 1), strCategory: name, strCategoryDescription: `Explore our ${name.toLowerCase()} recipe collection.`, strCategoryThumb: `https://dummyjson.com/image/240x160/efe7d8/2a2622?text=${encodeURIComponent(name)}` })) };
  },
  getMealsByCategory: async (category) => {
    const { data } = await apiClient.get(`/recipes/tag/${encodeURIComponent(category)}`);
    return { meals: data.recipes.map(normalizeRecipe) };
  },
};
