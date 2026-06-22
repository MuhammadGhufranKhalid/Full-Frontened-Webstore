// src/context/RecipeFiltersContext.jsx
// Holds the categories and areas (cuisines) lists globally — fetched once
// on app load and reused by the nav, the Categories page, the Cuisines
// page, and any dropdown filters. Avoids every page re-fetching the same
// two lists.

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { categoriesService } from "../api/categoriesService";
import { areasService } from "../api/areasService";

const RecipeFiltersContext = createContext(null);

export function RecipeFiltersProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const fetchFilters = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const [catRes, areaRes] = await Promise.all([
        categoriesService.getAll(),
        areasService.getAll(),
      ]);
      setCategories(catRes.categories || []);
      setAreas(areaRes.meals || []);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const value = { categories, areas, status, error, refetch: fetchFilters };

  return (
    <RecipeFiltersContext.Provider value={value}>
      {children}
    </RecipeFiltersContext.Provider>
  );
}

export function useRecipeFilters() {
  const ctx = useContext(RecipeFiltersContext);
  if (!ctx) {
    throw new Error(
      "useRecipeFilters must be used within a RecipeFiltersProvider"
    );
  }
  return ctx;
}
