// src/components/RecipeGrid.jsx
import RecipeCard from "./RecipeCard";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

export default function RecipeGrid({
  meals,
  status,
  error,
  onRetry,
  emptyTitle,
  emptyDescription,
}) {
  if (status === "loading" || status === "idle") {
    return <LoadingState />;
  }
  if (status === "error") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }
  if (!meals || meals.length === 0) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {meals.map((meal, i) => (
        <RecipeCard key={meal.idMeal} meal={meal} index={i} />
      ))}
    </div>
  );
}
