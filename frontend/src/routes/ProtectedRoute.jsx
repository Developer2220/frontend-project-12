import { Navigate } from 'react-router-dom';
import useAuthContext from '../auth/authProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
