// const App = () => <h1>Hexlet Chat</h1>;
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./auth/authProvider";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <AuthContextProvider>
            <AppRoutes />
          </AuthContextProvider>
        </Provider>
        <ToastContainer/>
      </BrowserRouter>
  );
};

export default App;
