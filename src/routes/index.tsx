import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = (): JSX.Element => {
  const DashboardComponent = React.lazy(() => import('../pages/Dashboard'));
  const CartComponent = React.lazy(() => import('../pages/Cart'));
  const LoginComponent = React.lazy(() => import('../pages/Login'));

  return (
    <Switch>
      <Route path="/" exact component={DashboardComponent} key="dashboard" />
      <Route path="/login" component={LoginComponent} key="login" />
      <Route
        path="/favorites"
        component={() => <DashboardComponent favorites />}
        key="favorites"
      />
      <Route path="/cart" component={CartComponent} />
    </Switch>
  );
};

export default Routes;
