import {
  useContext, createContext, useState, useMemo, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

export const getToken = () => localStorage.getItem('token');

const AuthContext = createContext({});
const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const token = getToken();
  const storedUser = localStorage.getItem('user');
  const [authState, setAuthState] = useState({
    token: token || null,
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!token,
  });

  const navigate = useNavigate();

  const logIn = useCallback((newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setAuthState({
      token: newToken,
      user: newUser,
      isAuthenticated: true,
    });
    navigate('/');
  }, [navigate]);

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
    navigate('/login');
  }, [navigate]);

  const authContextValue = useMemo(
    () => ({
      ...authState,
      logIn,
      logOut,
    }),
    [authState, logIn, logOut],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
