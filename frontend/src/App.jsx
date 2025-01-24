import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import AppRoutes from './routes/AppRoutes';

import { AuthContextProvider } from './auth/authProvider';
import SocketManager from './components/SocketManager';
import rollbarConfig from './config/rollbarConfig.js';

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider>
          <SocketManager />
          <AppRoutes />
        </AuthContextProvider>
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>

);

export default App;
