import React, {useContext} from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from '../Contexts/Auth';
//components
// import AppRoutes from "./app.routes";
// import AuthRoutes from "./auth.routes";
import Login from '../Pages/Login';
import PrivateRoute from './PrivateRoute';
import Home from '../Pages/Home';

const Routes: React.FC = () =>{
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
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
                <Route path="/login" component={Login}/>
            </Switch>
        </Router>
    );
}

export default Routes;