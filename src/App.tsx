import React, { Suspense } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';

import Header from './components/Header';

import { CartProvider } from './hooks/useCart';
import { FavoritesProvider } from './hooks/useFavorites';
import Routes from './routes';
import { AuthProvider } from './hooks/useAuth';

const DisplayHeader: React.FC = (): JSX.Element | null => {
  const location = useLocation();
  return location.pathname !== '/login' ? <Header /> : null;
}

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading app...</div>}>
        <AuthProvider>
          <CartProvider>
            <GlobalStyles />
            <DisplayHeader />
            <FavoritesProvider>
              <Routes />
            </FavoritesProvider>
            <ToastContainer autoClose={3000} />
          </CartProvider>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
