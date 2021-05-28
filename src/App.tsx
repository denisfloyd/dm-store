import React from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';

import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';
import { FavoritesProvider } from './hooks/useFavorites';

const App = (): JSX.Element => {
  return (
    <CartProvider>
      <GlobalStyles />
      <Header />
      <FavoritesProvider>
        <Dashboard />
      </FavoritesProvider>
      <ToastContainer autoClose={3000} />
    </CartProvider>
  );
};

export default App;
