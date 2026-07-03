import { Route, Routes } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import CuisinesPage from "./pages/CuisinesPage";
import CuisineDetailPage from "./pages/CuisineDetailPage";
import SearchPage from "./pages/SearchPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import DashboardPage from "./pages/admin/DashboardPage";
import RecipesAdminPage from "./pages/admin/RecipesAdminPage";
import CategoriesAdminPage from "./pages/admin/CategoriesAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";
import ProfilePage from "./pages/admin/ProfilePage";
import SettingsPage from "./pages/admin/SettingsPage";

export default function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route
          path="/categories/:name"
          element={<CategoryDetailPage />}
        />
        <Route path="/cuisines" element={<CuisinesPage />} />
        <Route
          path="/cuisines/:name"
          element={<CuisineDetailPage />}
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="recipes" element={<RecipesAdminPage />} />
          <Route
            path="categories"
            element={<CategoriesAdminPage />}
          />
          <Route path="users" element={<UsersAdminPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}