import { useContext, createContext, useState} from "react";
import { useNavigate } from "react-router-dom";

export const getToken = () => {
  return localStorage.getItem('token');
};

const AuthContext = createContext({});
const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const [authState, setAuthState] = useState({
    token: token || null,
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!localStorage.getItem('token')
  });

  const navigate = useNavigate();

  const logIn = (token, user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setAuthState({token: token, user: user, isAuthenticated: true})
    navigate("/");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ token: null, user: null, isAuthenticated: false });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...authState, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
