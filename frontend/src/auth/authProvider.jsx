import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticated,
  isAuthenticatedSelector,
} from "../store/slices/authSlices";

const AuthContext = createContext({});

const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logIn = () => {
    dispatch(setAuthenticated(true));
    navigate("/");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
