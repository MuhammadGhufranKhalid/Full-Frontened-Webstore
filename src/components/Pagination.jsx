import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, total, pageSize, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return <div className="mt-6 flex items-center justify-between gap-3 text-sm text-charcoal-soft">
    <span>Page {page} of {pages}</span>
    <div className="flex gap-2">
      <button className="rounded-lg border border-line p-2 disabled:opacity-40" disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft className="h-4 w-4" /></button>
      <button className="rounded-lg border border-line p-2 disabled:opacity-40" disabled={page >= pages} onClick={() => onChange(page + 1)}><ChevronRight className="h-4 w-4" /></button>
    </div>
  </div>;
}
