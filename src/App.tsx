import React from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';

import Dashboard from './pages/Dashboard';
import { CartProvider } from './hooks/useCart';

function App() {
  return (
    <CartProvider>
      <GlobalStyles />
      <Dashboard />
      <ToastContainer autoClose={3000} />
    </CartProvider>
  );
}

export default App;
