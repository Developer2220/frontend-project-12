import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import { AuthContextProvider } from "./auth/authProvider";
import { ToastContainer } from 'react-toastify';
import SocketManager from "./components/SocketManager";
import { Provider, ErrorBoundary } from '@rollbar/react'; 
import rollbarConfig from './config/rollbarConfig.js'

const App = () => {
  return (
    <Provider config={rollbarConfig}>
    <ErrorBoundary>
    <BrowserRouter>
          <AuthContextProvider>
          <SocketManager /> 
            <AppRoutes />
          </AuthContextProvider>
        <ToastContainer/>
      </BrowserRouter>
    </ErrorBoundary>
    </Provider>
   
   
  );
};

export default App;
