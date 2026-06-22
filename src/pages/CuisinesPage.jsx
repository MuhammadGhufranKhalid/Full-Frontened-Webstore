// src/pages/CuisinesPage.jsx
import { Link } from "react-router-dom";
import { Globe2 } from "lucide-react";
import { useRecipeFilters } from "../context/RecipeFiltersContext";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function CuisinesPage() {
  const { areas, status, error, refetch } = useRecipeFilters();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-charcoal-soft">
        Browse
      </p>
      <h1 className="mb-8 font-display text-3xl font-semibold text-charcoal">
        Cuisines
      </h1>

      {status === "loading" && <LoadingState count={12} />}
      {status === "error" && <ErrorState message={error} onRetry={refetch} />}

      {status === "success" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {areas.map((area, i) => (
            <Link
              key={area.strArea}
              to={`/cuisines/${area.strArea}`}
              className="group animate-fadeUp flex items-center gap-3 rounded-xl border border-line bg-white/40 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-paprika/40 hover:shadow-[0_8px_24px_-12px_rgba(42,38,34,0.25)]"
              style={{ animationDelay: `${(i % 12) * 0.03}s` }}
            >
              <Globe2
                className="h-4 w-4 shrink-0 text-olive"
                strokeWidth={1.75}
              />
              <span className="font-medium text-charcoal transition-colors group-hover:text-paprika">
                {area.strArea}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
