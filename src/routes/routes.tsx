import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/Auth';

import Login from '../Pages/Login';
import PrivateRoute from './PrivateRoute';
import Home from '../Pages/Home';
import Users from '../Pages/Users';

import "../custom.scss";

const Routes: React.FC = () =>{
    const { currentUser } = useAuth();

    return ( 
        <Router>
            <Switch>
                <PrivateRoute 
                isAuth={!!currentUser} 
                path="/" 
                redirectPath="/login"
                exact 
                component={Home}
                />

                <PrivateRoute
                 isAuth={!!currentUser}
                 path="/users"
                 redirectPath="/login"
                 component={Users}
                />

                <Route path="/login" component={Login}/>
            </Switch>
        </Router>
    );
}

export default Routes;