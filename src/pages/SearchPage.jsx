// src/pages/SearchPage.jsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useRecipeSearch } from "../hooks/useRecipeSearch";
import RecipeGrid from "../components/RecipeGrid";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { query, setQuery, results, status, error, refetch } =
    useRecipeSearch(initialQuery);

  // keep the input in sync if the user arrives via a ?q= link
  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-charcoal-soft">
        Find something
      </p>
      <h1 className="mb-6 font-display text-3xl font-semibold text-charcoal">
        Search recipes
      </h1>

      <div className="relative mb-10 max-w-lg">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-charcoal-soft"
          strokeWidth={1.75}
        />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'chicken', 'pasta', 'cake'…"
          className="w-full rounded-full border border-line bg-white/60 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder:text-charcoal-soft/70 outline-none transition-colors focus:border-paprika focus:bg-white"
        />
      </div>

      {!query.trim() ? (
        <p className="text-sm text-charcoal-soft">
          Start typing to search hundreds of recipes by name.
        </p>
      ) : (
        <RecipeGrid
          meals={results}
          status={status}
          error={error}
          onRetry={refetch}
          emptyTitle="No matches"
          emptyDescription={`Nothing found for "${query}". Try a different word.`}
        />
      )}
    </div>
  );
}
