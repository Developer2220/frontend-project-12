import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
        )}
    />
    <Route path="login" element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
    <Route path="signup" element={<SignupPage />} />
  </Routes>
);

export default AppRoutes;
