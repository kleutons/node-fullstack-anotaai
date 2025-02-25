import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./app/HomePage";
import LoginPage from "./app/LoginPage";
import NotFoundPage from "./app/NotFoundPage";
import ForbiddenPage from "./app/ForbiddenPage";
import ProfilePage from "./app/ProfilePage";
import CategoryPage from "./app/CategoryPage";
import ProductPage from "./app/ProductPage";
import DevPage from "./app/DevPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TestPage from "./app/TestPage";
import UserListPage from "./app/UserListPage";
import CatalogPage from "./app/catalog/CatalogPage";
import OrderFinishedPage from "./app/catalog/OrderFinishedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile"         element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/user-list"    element={<ProtectedRoute element={<UserListPage />} />} />
          <Route path="/category"     element={<ProtectedRoute element={<CategoryPage />} />} />
          <Route path="/product"      element={<ProtectedRoute element={<ProductPage />} />} />
          <Route path="/dev"          element={<DevPage />} />
          <Route path="/test"         element={<TestPage />} />
        </Route>
        <Route path="/catalog/:ownerIdOrStoreId" element={<CatalogPage />} />
        <Route path="/catalog/finished" element={<OrderFinishedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
