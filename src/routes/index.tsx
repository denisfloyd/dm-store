import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = (): JSX.Element => {
  const DashboardComponent = React.lazy(() => import('../pages/Dashboard'));
  const CartComponent = React.lazy(() => import('../pages/Cart'));

  return (
    <Switch>
      <Route path="/" exact component={DashboardComponent} />
      <Route path="/cart" component={CartComponent} />
    </Switch>
  );
};

export default Routes;
