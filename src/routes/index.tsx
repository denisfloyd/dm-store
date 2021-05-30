import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

const Routes = (): JSX.Element => {
  const DashboardComponent = React.lazy(() => import('../pages/Dashboard'));
  const FavoritesComponent = React.lazy(() => import('../pages/Favorites'));
  const CartComponent = React.lazy(() => import('../pages/Cart'));
  const LoginComponent = React.lazy(() => import('../pages/Login'));

  return (
    <Switch>
      <Route exact path="/" component={DashboardComponent} key="dashboard" />
      <Route path="/login" component={LoginComponent} key="login" />
      <Route
        path="/favorites"
        isPrivate
        component={FavoritesComponent}
        key="favorites"
      />
      <Route path="/cart" component={CartComponent} />
    </Switch>
  );
};

export default Routes;
