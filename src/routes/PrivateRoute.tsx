import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export interface IPrivateRouteProps extends RouteProps {
  isAuth: boolean // is authenticate route
  redirectPath: string // redirect path if don't authenticate route
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
   return props.isAuth ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{pathname: props.redirectPath}} />
  )
}

export default PrivateRoute