import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import GlobalStyles from './styles/global';

import Routes from './routes';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';

const DisplayHeader: React.FC = (): JSX.Element | null => {
  const location = useLocation();
  return location.pathname !== '/login' ? <Header /> : null;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyles />
        <DisplayHeader />
        <Routes />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
