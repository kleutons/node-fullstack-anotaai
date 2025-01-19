import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./app/LoginPage";
import HomePage from "./app/HomePage";
import NotFoundPage from "./app/NotFoundPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
