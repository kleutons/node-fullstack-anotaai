import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./app/HomePage";
import LoginPage from "./app/LoginPage";
import NotFoundPage from "./app/NotFoundPage";
import ProfilePage from "./app/ProfilePage";
import CategoryPage from "./app/CategoryPage";
import ProductPage from "./app/ProductPage";
import DevPage from "./app/DevPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TestPage from "./app/TestPage";
import UserListPage from "./app/UserListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile"         element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/user-list"    element={<ProtectedRoute element={<UserListPage />} />} />
          <Route path="/category"     element={<ProtectedRoute element={<CategoryPage />} />} />
          <Route path="/product"      element={<ProtectedRoute element={<ProductPage />} />} />
          <Route path="/dev"          element={<DevPage />} />
          <Route path="/test"         element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
