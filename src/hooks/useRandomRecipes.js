// src/hooks/useRandomRecipes.js
// Fetches a batch of random meals for the home page's "Today's Picks" rail.

import { useCallback } from "react";
import { recipesService } from "../api/recipesService";
import { useFetch } from "./useFetch";

export function useRandomRecipes(count = 8) {
  const fetcher = useCallback(
    () => recipesService.getRandomBatch(count),
    [count]
  );
  return useFetch(fetcher, [count]);
}
