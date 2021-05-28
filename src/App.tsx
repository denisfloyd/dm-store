import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';

import Header from './components/Header';
import { CartProvider } from './hooks/useCart';
import Routes from './routes';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading app...</div>}>
        <CartProvider>
          <GlobalStyles />
          <Header />
          <Routes />
          <ToastContainer autoClose={3000} />
        </CartProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
