import React from 'react';
import { useAuth } from '../../Contexts/Auth';

import './NavBar.scss';

const NavBar: React.FC = () => {
    const {LogOut, currentUser} = useAuth();
    return (
    
        <nav className="navbar navbar-dark px-5 bg-primary">
            <span className="navbar-brand logo-lg mb-0 h1">ORDR.</span>
            <ul className="navbar-nav row mr-auto mt-2 mt-lg-0">
                <li className="nav-item ml-5">
                    <a className="nav-link" href="#/">Home</a>
                </li>
                <li className="nav-item ml-3">
                    <a className="nav-link" href="#/product">Product</a>
                </li>
                <li className="nav-item ml-3">
                    <a className="nav-link" href="#/users">Users</a>
                </li>
            </ul>

            <span className="text-white text-sm my-2 my-sm-0">{currentUser?.displayName}</span>

            <button 
             className="btn btn-sm btn-dark text-white my-2 ml-3    my-sm-0"
             onClick={LogOut}
            >
                LogOut
            </button>
        </nav>
  
    );
}

export default NavBar;