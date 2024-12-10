import { Navigate } from 'react-router-dom';
import useAuthContext from '../auth/authProvider';
//import useStore from './useStore';

const ProtectedRoute = ({ children }) => {
    const {isAuthenticated} = useAuthContext()
    
  // const { user } = useStore(); //update if needed when state logic is done


  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
