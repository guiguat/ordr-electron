import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/Auth';

import "../custom.scss";

import Login from '../Pages/Login';
import PrivateRoute from './PrivateRoute';
import Home from '../Pages/Home';
import User from '../Pages/User';
import Product from '../Pages/Product';
import Report from '../Pages/Report';
import Costumer from '../Pages/Costumer';
import Col from '../Components/Col';
import Container from '../Components/Container';
import NavBar from '../Components/NavBar';

const Routes: React.FC = () =>{
    const { currentUser } = useAuth();

    return ( 
        <Router>
            <Container>
                <Col type="nav" className={`${!!currentUser?'':'d-none'}`}>
                    <NavBar primary="report"/>
                </Col>
                <Col>
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

                        <PrivateRoute
                        isAuth={!!currentUser}
                        path="/costumer"
                        redirectPath="/login"
                        component={Costumer}
                        />

                        <Route path="/login" component={Login}/>
                    </Switch>
                </Col>
            </Container>
        </Router>
    );
}

export default Routes;