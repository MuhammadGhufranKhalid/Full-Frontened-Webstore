// src/pages/CuisineDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMealsByArea } from "../hooks/useMealsByArea";
import RecipeGrid from "../components/RecipeGrid";

export default function CuisineDetailPage() {
  const { name } = useParams();
  const { data: meals, status, error, refetch } = useMealsByArea(name);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/cuisines"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-soft transition-colors hover:text-paprika"
      >
        <ArrowLeft className="h-4 w-4" />
        All cuisines
      </Link>

      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-charcoal-soft">
        Cuisine
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
        emptyDescription={`Nothing on file for ${name} cuisine yet.`}
      />
    </div>
  );
}
