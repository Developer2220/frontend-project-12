import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import AppRoutes from './routes/AppRoutes';
import { AuthContextProvider } from './auth/authProvider';
import SocketManager from './components/SocketManager';
import rollbarConfig from './config/rollbarConfig.js';
import addWords from './initLeoProfanity';
import ModalRenderer from './components/Modals/ModalRenderer';

const App = () => {
  useEffect(() => {
    addWords();
  }, []);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthContextProvider>
            <SocketManager />
            <AppRoutes />
          </AuthContextProvider>
          <ToastContainer />
          <ModalRenderer />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
