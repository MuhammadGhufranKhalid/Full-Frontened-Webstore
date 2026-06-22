// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import CuisinesPage from "./pages/CuisinesPage";
import CuisineDetailPage from "./pages/CuisineDetailPage";
import SearchPage from "./pages/SearchPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:name" element={<CategoryDetailPage />} />
          <Route path="/cuisines" element={<CuisinesPage />} />
          <Route path="/cuisines/:name" element={<CuisineDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
