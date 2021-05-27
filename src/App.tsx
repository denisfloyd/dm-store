import React from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';

import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';

function App() {
  return (
    <CartProvider>
      <GlobalStyles />
      <Header />
      <Dashboard />
      <ToastContainer autoClose={3000} />
    </CartProvider>
  );
}

export default App;
