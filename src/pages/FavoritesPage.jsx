// src/pages/FavoritesPage.jsx
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import RecipeCard from "../components/RecipeCard";
import EmptyState from "../components/EmptyState";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-charcoal-soft">
        Your kitchen notes
      </p>
      <h1 className="mb-8 flex items-center gap-2 font-display text-3xl font-semibold text-charcoal">
        Saved recipes
        <Heart className="h-6 w-6 fill-paprika text-paprika" />
      </h1>

      {favorites.length === 0 ? (
        <div>
          <EmptyState
            title="Nothing saved yet"
            description="Tap the heart on any recipe to keep it here."
          />
          <div className="mt-2 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream transition-opacity hover:opacity-90"
            >
              Find a recipe
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((meal, i) => (
            <RecipeCard key={meal.idMeal} meal={meal} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
