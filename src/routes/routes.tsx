import React, {useContext} from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AuthContext } from '../Contexts/Auth';
//components
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes: React.FC = () =>{
    const {currentUser} = useContext(AuthContext);
    return (
        <Router>

            {
                !!currentUser? (
                    <AppRoutes/>
                ):(
                    <AuthRoutes/>
                )
            }

        </Router>
    );
}

export default Routes;