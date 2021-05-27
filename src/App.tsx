import React from 'react';
import GlobalStyles from './styles/global';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
