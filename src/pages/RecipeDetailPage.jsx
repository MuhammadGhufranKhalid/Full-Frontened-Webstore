// src/pages/RecipeDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Tag, Globe2, PlayCircle } from "lucide-react";
import { useRecipeDetail } from "../hooks/useRecipeDetail";
import { useFavorites } from "../context/FavoritesContext";
import {
  getIngredientList,
  getInstructionSteps,
  getYoutubeEmbedUrl,
  getIngredientThumb,
} from "../utils/mealHelpers";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { data: meal, status, error, refetch } = useRecipeDetail(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (status === "loading" || status === "idle") {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <LoadingState count={1} />
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }
  if (!meal) return null;

  const ingredients = getIngredientList(meal);
  const steps = getInstructionSteps(meal.strInstructions);
  const videoEmbed = getYoutubeEmbedUrl(meal.strYoutube);
  const favorite = isFavorite(meal.idMeal);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-soft transition-colors hover:text-paprika"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Hero image */}
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="aspect-[16/9] w-full object-cover"
        />
        <button
          onClick={() => toggleFavorite(meal)}
          aria-label={favorite ? "Remove from saved" : "Save recipe"}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform hover:scale-110"
        >
          <Heart
            className={`h-5 w-5 ${
              favorite ? "fill-paprika text-paprika" : "text-charcoal"
            }`}
            strokeWidth={1.75}
          />
        </button>
      </div>

      {/* Title + meta */}
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
            {meal.strMeal}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {meal.strCategory && (
              <Link
                to={`/categories/${meal.strCategory}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-paprika-dim px-3 py-1.5 text-xs font-medium text-paprika"
              >
                <Tag className="h-3 w-3" />
                {meal.strCategory}
              </Link>
            )}
            {meal.strArea && (
              <Link
                to={`/cuisines/${meal.strArea}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream-dim px-3 py-1.5 text-xs font-medium text-charcoal-soft"
              >
                <Globe2 className="h-3 w-3" />
                {meal.strArea}
              </Link>
            )}
          </div>
        </div>

        {videoEmbed && (
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-charcoal-soft transition-colors hover:border-paprika hover:text-paprika"
          >
            <PlayCircle className="h-4 w-4" />
            Watch video
          </a>
        )}
      </div>

      {/* Two-column: ingredients + steps */}
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr]">
        {/* Ingredients */}
        <aside>
          <h2 className="mb-4 font-display text-lg font-semibold text-charcoal">
            Ingredients
          </h2>
          <ul className="space-y-3">
            {ingredients.map((ing) => (
              <li key={ing.id} className="flex items-center gap-3">
                <img
                  src={meal.image || getIngredientThumb(ing.name)}
                  alt={ing.name}
                  loading="lazy"
                  className="h-9 w-9 shrink-0 rounded-lg bg-cream-dim object-cover"
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />
                <div className="min-w-0 text-sm">
                  <span className="font-medium text-charcoal">
                    {ing.name}
                  </span>
                  {ing.measure && (
                    <span className="block text-xs text-charcoal-soft">
                      {ing.measure}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Steps */}
        <div>
          <h2 className="mb-4 font-display text-lg font-semibold text-charcoal">
            Method
          </h2>
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paprika font-mono text-xs font-semibold text-cream">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed text-charcoal-soft">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Video embed */}
      {videoEmbed && (
        <div className="mt-12">
          <h2 className="mb-4 font-display text-lg font-semibold text-charcoal">
            Watch it made
          </h2>
          <div className="aspect-video w-full overflow-hidden rounded-2xl">
            <iframe
              src={videoEmbed}
              title={`${meal.strMeal} video`}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
