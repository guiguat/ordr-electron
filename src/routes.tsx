import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

//components
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const Routes: React.FC = () =>{
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </Router>
    );
}

export default Routes;