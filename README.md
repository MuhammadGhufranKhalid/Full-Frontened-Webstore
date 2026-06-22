# Kitchen Notes — Recipe Discovery Website

A modern recipe-discovery website built with React + Tailwind, powered by
TheMealDB (https://www.themealdb.com) — a free, no-API-key-required recipe API.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (via @tailwindcss/vite)
- React Router v6
- Context API for global state
- Custom hooks for all data fetching
- lucide-react for icons

## Run it

```bash
npm install
npm run dev
```

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, category strip, random "Today's picks" |
| `/categories` | All categories grid |
| `/categories/:name` | Recipes within one category |
| `/cuisines` | All cuisines/areas grid |
| `/cuisines/:name` | Recipes within one cuisine |
| `/search?q=...` | Live debounced search by name |
| `/recipe/:id` | Full recipe detail — ingredients, steps, video |
| `/favorites` | Saved recipes (persisted to localStorage) |

## Folder structure

```
src/
├── api/                          # Service layer — one file per resource
│   ├── client.js                 # Shared fetch wrapper (base URL, errors)
│   ├── recipesService.js         # search / lookup / random
│   ├── categoriesService.js      # categories list + filter by category
│   └── areasService.js           # cuisines list + filter by area
│
├── context/                       # Global state (Context API)
│   ├── RecipeFiltersContext.jsx   # Categories + Areas, fetched once
│   └── FavoritesContext.jsx       # Saved recipes, persisted to localStorage
│
├── hooks/                          # Custom hooks
│   ├── useFetch.js                 # Generic async-state hook
│   ├── useRandomRecipes.js         # Batch of random meals (home page)
│   ├── useRecipeDetail.js          # Single recipe by id
│   ├── useRecipeSearch.js          # Debounced search-by-name
│   ├── useMealsByCategory.js       # Meals filtered by category
│   ├── useMealsByArea.js           # Meals filtered by cuisine
│   └── useDebounce.js              # Generic debounce utility
│
├── components/
│   ├── Navbar.jsx / Footer.jsx
│   ├── RecipeCard.jsx / RecipeGrid.jsx
│   ├── LoadingState.jsx / ErrorState.jsx / EmptyState.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── CategoriesPage.jsx / CategoryDetailPage.jsx
│   ├── CuisinesPage.jsx / CuisineDetailPage.jsx
│   ├── SearchPage.jsx
│   ├── RecipeDetailPage.jsx
│   ├── FavoritesPage.jsx
│   └── NotFoundPage.jsx
│
├── utils/mealHelpers.js   # Parses TheMealDB's flat ingredient fields,
│                           # instruction steps, YouTube embed URL
├── App.jsx                # Routes + layout
└── main.jsx                # Providers (Router > RecipeFiltersProvider > FavoritesProvider)
```

## Notes on TheMealDB's data shape

- Ingredients come as 20 flat fields (`strIngredient1`...`strIngredient20`,
  `strMeasure1`...`strMeasure20`) instead of an array — `utils/mealHelpers.js`
  turns this into a clean list.
- `filter.php` (by category/area) returns lightweight meal stubs
  (id, name, thumbnail only) — full details are fetched separately via
  `lookup.php` on the recipe detail page.
- No API key needed; the free test key `1` is baked into the base URL.
