import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AppRoutes;
