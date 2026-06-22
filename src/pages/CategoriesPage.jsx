// src/pages/CategoriesPage.jsx
import { Link } from "react-router-dom";
import { useRecipeFilters } from "../context/RecipeFiltersContext";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function CategoriesPage() {
  const { categories, status, error, refetch } = useRecipeFilters();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-charcoal-soft">
        Browse
      </p>
      <h1 className="mb-8 font-display text-3xl font-semibold text-charcoal">
        Categories
      </h1>

      {status === "loading" && <LoadingState count={8} />}
      {status === "error" && <ErrorState message={error} onRetry={refetch} />}

      {status === "success" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.idCategory}
              to={`/categories/${cat.strCategory}`}
              className="group animate-fadeUp flex gap-4 overflow-hidden rounded-2xl border border-line bg-white/40 p-4 transition-all hover:-translate-y-0.5 hover:border-paprika/40 hover:shadow-[0_8px_24px_-12px_rgba(42,38,34,0.25)]"
              style={{ animationDelay: `${(i % 9) * 0.04}s` }}
            >
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-charcoal transition-colors group-hover:text-paprika">
                  {cat.strCategory}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-charcoal-soft">
                  {cat.strCategoryDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
