// src/hooks/useMealsByCategory.js
// Fetches the meal list for a given category (used on the Category detail
// page). filter.php returns lightweight meal stubs (id, name, thumb only).

import { useCallback } from "react";
import { categoriesService } from "../api/categoriesService";
import { useFetch } from "./useFetch";

export function useMealsByCategory(category) {
  const fetcher = useCallback(async () => {
    if (!category) return [];
    const res = await categoriesService.getMealsByCategory(category);
    return res.meals || [];
  }, [category]);

  return useFetch(fetcher, [category]);
}
