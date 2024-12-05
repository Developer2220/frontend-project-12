import { useContext, createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticated,
  isAuthenticatedSelector,
} from "../store/slices/authSlices";

const AuthContext = createContext({});

const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const token = localStorage.getItem('token');
  console.log('token>>>>', token)

  const [authState, setAuthState] = useState({
    token: token || null,
  });

  console.log('authState', authState)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logIn = (token) => {
    dispatch(setAuthenticated(true));
    setAuthState({token: token})
    navigate("/");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...authState, isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
