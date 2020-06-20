import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
        <Route exact path="/home" component={Home}/>
    </Switch>
  );
}

export default AppRoutes;