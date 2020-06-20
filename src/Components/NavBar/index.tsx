import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/Auth';

import './NavBar.scss';

const NavBar: React.FC = () => {
    const {LogOut, currentUser} = useContext(AuthContext);
    return (
    
        <nav className="navbar navbar-dark px-5 row bg-primary">
            <span className="navbar-brand logo-lg mb-0 h1">ORDR.</span>
            <ul className="navbar-nav row mr-auto mt-2 mt-lg-0">
                <li className="nav-item ml-5">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item ml-3">
                    <a className="nav-link" href="/product">Product</a>
                </li>
                <li className="nav-item ml-3">
                    <a className="nav-link" href="/users">Users</a>
                </li>
            </ul>

            <button 
             className="btn text-white my-2 my-sm-0"
             onClick={LogOut}
            >
                {/* change to user.displayname later */}
                {currentUser?.displayName}, LogOut
            </button>
        </nav>
  
    );
}

export default NavBar;