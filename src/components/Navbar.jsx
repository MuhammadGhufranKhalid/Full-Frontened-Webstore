// src/components/Navbar.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Heart, Menu, X, ChefHat } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

const LINKS = [
  { to: "/categories", label: "Categories" },
  { to: "/cuisines", label: "Cuisines" },
];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <ChefHat className="h-6 w-6 text-paprika" strokeWidth={1.75} />
          <span className="font-display text-xl font-semibold tracking-tight text-charcoal">
            Kitchen Notes
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-paprika"
                    : "text-charcoal-soft hover:text-charcoal"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <form onSubmit={handleSearch} className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-soft"
              strokeWidth={1.75}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes…"
              className="w-56 rounded-full border border-line bg-white/60 py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-charcoal-soft/70 outline-none transition-colors focus:border-paprika focus:bg-white"
            />
          </form>

          <Link
            to="/favorites"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-charcoal-soft transition-colors hover:border-paprika hover:text-paprika"
            aria-label="Saved recipes"
          >
            <Heart className="h-4.5 w-4.5" strokeWidth={1.75} />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-paprika px-1 font-mono text-[10px] font-semibold text-cream">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-charcoal" />
          ) : (
            <Menu className="h-5 w-5 text-charcoal" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-line px-6 py-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-soft"
              strokeWidth={1.75}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes…"
              className="w-full rounded-full border border-line bg-white/60 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-paprika focus:bg-white"
            />
          </form>
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-charcoal-soft hover:text-charcoal"
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/favorites"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-charcoal-soft hover:text-charcoal"
            >
              <Heart className="h-4 w-4" />
              Saved ({favorites.length})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
