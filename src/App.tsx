import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';

import Header from './components/Header';

import { CartProvider } from './hooks/useCart';
import { FavoritesProvider } from './hooks/useFavorites';
import Routes from './routes';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading app...</div>}>
        <CartProvider>
          <GlobalStyles />
          <Header />
          <FavoritesProvider>
            <Routes />
          </FavoritesProvider>
          <ToastContainer autoClose={3000} />
        </CartProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
