import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import { RecipeFiltersProvider } from "./context/RecipeFiltersContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RecipeFiltersProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </RecipeFiltersProvider>
    </BrowserRouter>
  </StrictMode>
);
