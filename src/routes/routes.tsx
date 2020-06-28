import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/Auth';

import Login from '../Pages/Login';
import PrivateRoute from './PrivateRoute';
import Home from '../Pages/Home';
import User from '../Pages/User';
import Product from '../Pages/Product';
import Report from '../Pages/Report';

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
                 path="/user"
                 redirectPath="/login"
                 component={User}
                />
                
                <PrivateRoute
                 isAuth={!!currentUser}
                 path="/product"
                 redirectPath="/login"
                 component={Product}
                />

                <PrivateRoute
                 isAuth={!!currentUser}
                 path="/report"
                 redirectPath="/login"
                 component={Report}
                />

                <Route path="/login" component={Login}/>
            </Switch>
        </Router>
    );
}

export default Routes;