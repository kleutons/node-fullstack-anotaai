import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/HomePage";
import NotFoundPage from "./app/NotFoundPage";
import DashboardLayout from "./layouts/DashboardLayout";
import UserPage from "./app/UserPage";
import CategoryPage from "./app/CategoryPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route index                element={<HomePage />} />
          <Route path="/user"         element={<UserPage />} />
          <Route path="/category"     element={<CategoryPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
