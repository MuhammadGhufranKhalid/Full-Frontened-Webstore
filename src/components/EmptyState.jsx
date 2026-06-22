// src/components/EmptyState.jsx
import { UtensilsCrossed } from "lucide-react";

export default function EmptyState({
  title = "Nothing here",
  description = "Try a different search.",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
      <UtensilsCrossed
        className="h-7 w-7 text-charcoal-soft/40"
        strokeWidth={1.5}
      />
      <p className="font-display text-xl font-semibold text-charcoal">
        {title}
      </p>
      <p className="max-w-xs text-sm text-charcoal-soft">{description}</p>
    </div>
  );
}
