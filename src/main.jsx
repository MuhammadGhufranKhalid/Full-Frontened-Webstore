import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import { RecipeFiltersProvider } from "./context/RecipeFiltersContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider><RecipeFiltersProvider><FavoritesProvider><App /><ToastContainer position="top-right" autoClose={2800} /></FavoritesProvider></RecipeFiltersProvider></AuthProvider>
    </HashRouter>
  </StrictMode>
);
