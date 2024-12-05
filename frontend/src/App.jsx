// const App = () => <h1>Hexlet Chat</h1>;
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./auth/authProvider";

const App = () => {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <AuthContextProvider>
            <AppRoutes />
          </AuthContextProvider>
        </Provider>
      </BrowserRouter>
  );
};

export default App;
