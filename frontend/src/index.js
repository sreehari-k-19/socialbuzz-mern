
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store, persistor } from './User/redux/Store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const clientId = process.env.REACT_APP_CLIENT_ID
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={clientId}>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
