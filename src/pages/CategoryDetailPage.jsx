// src/pages/CategoryDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMealsByCategory } from "../hooks/useMealsByCategory";
import RecipeGrid from "../components/RecipeGrid";

export default function CategoryDetailPage() {
  const { name } = useParams();
  const { data: meals, status, error, refetch } = useMealsByCategory(name);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/categories"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-soft transition-colors hover:text-paprika"
      >
        <ArrowLeft className="h-4 w-4" />
        All categories
      </Link>

      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-charcoal-soft">
        Category
      </p>
      <h1 className="mb-8 font-display text-3xl font-semibold text-charcoal">
        {name}
      </h1>

      <RecipeGrid
        meals={meals}
        status={status}
        error={error}
        onRetry={refetch}
        emptyTitle="No recipes found"
        emptyDescription={`Nothing on file for ${name} yet.`}
      />
    </div>
  );
}
