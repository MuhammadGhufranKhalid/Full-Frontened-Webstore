// src/hooks/useMealsByArea.js
// Fetches the meal list for a given cuisine/area (used on the Cuisine
// detail page).

import { useCallback } from "react";
import { areasService } from "../api/areasService";
import { useFetch } from "./useFetch";

export function useMealsByArea(area) {
  const fetcher = useCallback(async () => {
    if (!area) return [];
    const res = await areasService.getMealsByArea(area);
    return res.meals || [];
  }, [area]);

  return useFetch(fetcher, [area]);
}
