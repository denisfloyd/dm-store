import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default Routes;
