// src/hooks/useRecipeDetail.js
// Fetches the full recipe payload for a single meal id (detail page).

import { useCallback } from "react";
import { recipesService } from "../api/recipesService";
import { useFetch } from "./useFetch";

export function useRecipeDetail(id) {
  const fetcher = useCallback(async () => {
    const res = await recipesService.getById(id);
    return res.meals ? res.meals[0] : null;
  }, [id]);

  return useFetch(fetcher, [id]);
}
