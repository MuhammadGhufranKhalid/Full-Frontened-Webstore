// src/components/RecipeCard.jsx
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeCard({ meal, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(meal.idMeal);

  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className="group animate-fadeUp block"
      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-cream-dim">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(meal);
          }}
          aria-label={favorite ? "Remove from saved" : "Save recipe"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 ${
              favorite ? "fill-paprika text-paprika" : "text-charcoal"
            }`}
            strokeWidth={1.75}
          />
        </button>

        {(meal.strCategory || meal.strArea) && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-charcoal-soft backdrop-blur-sm">
            {meal.strArea || meal.strCategory}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-charcoal transition-colors group-hover:text-paprika">
        {meal.strMeal}
      </h3>
      {meal.strCategory && (
        <p className="mt-0.5 text-xs text-charcoal-soft">
          {meal.strCategory}
        </p>
      )}
    </Link>
  );
}
