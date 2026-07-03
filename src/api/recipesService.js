import { apiClient } from "./client";

export function normalizeRecipe(recipe) {
  return {
    ...recipe,
    idMeal: String(recipe.id),
    strMeal: recipe.name,
    strMealThumb: recipe.image,
    strCategory: recipe.mealType?.[0] || "Recipe",
    strArea: recipe.cuisine || "International",
    strInstructions: recipe.instructions,
    strYoutube: "",
  };
}

const normalizeList = (data) => ({ ...data, recipes: data.recipes?.map(normalizeRecipe), meals: data.recipes?.map(normalizeRecipe) });

export const recipesService = {
  getAll: async ({ limit = 12, skip = 0 } = {}) => normalizeList((await apiClient.get(`/recipes?limit=${limit}&skip=${skip}`)).data),
  searchByName: async (name, { limit = 12, skip = 0 } = {}) => normalizeList((await apiClient.get(`/recipes/search?q=${encodeURIComponent(name)}&limit=${limit}&skip=${skip}`)).data),
  getById: async (id) => normalizeRecipe((await apiClient.get(`/recipes/${id}`)).data),
  getRandomBatch: async (count = 8) => normalizeList((await apiClient.get(`/recipes?limit=${count}&skip=${Math.floor(Math.random() * 20)}`)).data).meals,
  getByTag: async (tag) => normalizeList((await apiClient.get(`/recipes/tag/${encodeURIComponent(tag)}`)).data),
  getByMealType: async (type) => normalizeList((await apiClient.get(`/recipes/meal-type/${encodeURIComponent(type)}`)).data),
  create: async (recipe) => normalizeRecipe((await apiClient.post("/recipes/add", recipe)).data),
  update: async (id, recipe) => normalizeRecipe((await apiClient.put(`/recipes/${id}`, recipe)).data),
  remove: async (id) => (await apiClient.delete(`/recipes/${id}`)).data,
};
