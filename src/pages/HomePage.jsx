// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Shuffle } from "lucide-react";
import { useRandomRecipes } from "../hooks/useRandomRecipes";
import { useRecipeFilters } from "../context/RecipeFiltersContext";
import RecipeGrid from "../components/RecipeGrid";

export default function HomePage() {
  const { data: meals, status, error, refetch } = useRandomRecipes(8);
  const { categories, status: catStatus } = useRecipeFilters();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-14 sm:pt-20">
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-paprika">
            A free recipe box, always open
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl">
            Cook something{" "}
            <span className="italic text-paprika">worth</span> talking
            about.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal-soft">
            Browse hundreds of dishes from kitchens around the world —
            search by name, explore by category, or let chance pick
            tonight's dinner.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream transition-opacity hover:opacity-90"
            >
              Browse categories
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={refetch}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-paprika hover:text-paprika"
            >
              <Shuffle className="h-4 w-4" />
              Surprise me
            </button>
          </div>
        </div>
      </section>

      {/* Category strip */}
      {catStatus === "success" && categories.length > 0 && (
        <section className="border-y border-line bg-cream-dim/50 py-5">
          <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.slice(0, 10).map((cat) => (
              <Link
                key={cat.idCategory}
                to={`/categories/${cat.strCategory}`}
                className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-charcoal-soft transition-colors hover:border-paprika hover:text-paprika"
              >
                {cat.strCategory}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Random picks */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-charcoal-soft">
              On the pass
            </p>
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              Today's picks
            </h2>
          </div>
          <button
            onClick={refetch}
            className="hidden items-center gap-1.5 text-sm font-medium text-charcoal-soft transition-colors hover:text-paprika sm:flex"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Shuffle
          </button>
        </div>

        <RecipeGrid
          meals={meals}
          status={status}
          error={error}
          onRetry={refetch}
          emptyTitle="No picks right now"
          emptyDescription="Try shuffling again."
        />
      </section>
    </div>
  );
}
