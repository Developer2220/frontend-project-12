import { useContext, createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticated,
  isAuthenticatedSelector,
} from "../store/slices/authSlices";

export const getToken = () => {
  return localStorage.getItem('token'); // Или другое хранилище токена
};

const AuthContext = createContext({});

const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const token = localStorage.getItem('token');
  console.log('token>>>>', token)

  const storedUser = localStorage.getItem('user');


  const [authState, setAuthState] = useState({
    token: token || null,
    // user: null,
    user: storedUser ? JSON.parse(storedUser) : null, // Парсим пользователя из JSON

  });

  console.log('authState', authState)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logIn = (token, user) => {
    dispatch(setAuthenticated(true));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
    setAuthState({token: token, user: user})
    navigate("/");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ token: null, user: null });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...authState, isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
