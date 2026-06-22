// src/components/ErrorState.jsx
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorState({
  message = "Couldn't load this recipe.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <AlertTriangle className="h-8 w-8 text-paprika" strokeWidth={1.5} />
      <p className="max-w-xs text-sm text-charcoal-soft">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition-opacity hover:opacity-90"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Try again
        </button>
      )}
    </div>
  );
}
