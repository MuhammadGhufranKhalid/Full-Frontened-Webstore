// src/hooks/useRecipeSearch.js
// Debounced live search by recipe name. Only fires the API call after the
// user has stopped typing for 400ms, and skips the call entirely for an
// empty query.

import { useState, useCallback } from "react";
import { recipesService } from "../api/recipesService";
import { useFetch } from "./useFetch";
import { useDebounce } from "./useDebounce";

export function useRecipeSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 400);

  const fetcher = useCallback(async () => {
    if (!debouncedQuery.trim()) return [];
    const res = await recipesService.searchByName(debouncedQuery.trim());
    return res.meals || [];
  }, [debouncedQuery]);

  const { data, status, error, refetch } = useFetch(fetcher, [debouncedQuery]);

  return {
    query,
    setQuery,
    results: data || [],
    status: debouncedQuery.trim() ? status : "idle",
    error,
    refetch,
  };
}
