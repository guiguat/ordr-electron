import React, {useContext} from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from '../Contexts/Auth';

import Login from '../Pages/Login';
import PrivateRoute from './PrivateRoute';
import Home from '../Pages/Home';

import "../custom.scss";

const Routes: React.FC = () =>{
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Navbar</span>
            </nav>
            <Router>
                <Switch>
                    <PrivateRoute 
                    isAuth={!!currentUser} 
                    path="/" 
                    redirectPath="/login"
                    exact 
                    component={Home}
                    />
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        </>
    );
}

export default Routes;