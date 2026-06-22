// src/context/FavoritesContext.jsx
// Global state for saved/favorite recipes. Persisted to localStorage so
// favorites survive a page refresh. Stores lightweight recipe summaries
// (not the full recipe payload) so the favorites page can render cards
// without re-fetching every recipe.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const STORAGE_KEY = "kitchen-notes:favorites";
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.idMeal === id),
    [favorites]
  );

  const toggleFavorite = useCallback((meal) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.idMeal === meal.idMeal);
      if (exists) {
        return prev.filter((f) => f.idMeal !== meal.idMeal);
      }
      return [
        ...prev,
        {
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory,
          strArea: meal.strArea,
        },
      ];
    });
  }, []);

  const value = { favorites, isFavorite, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
}
