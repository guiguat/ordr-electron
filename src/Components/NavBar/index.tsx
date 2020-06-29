import React from 'react';

import './NavBar.scss';
import { FiSettings } from 'react-icons/fi';

interface Iprops {
    primary:string;
}

const NavBar: React.FC<Iprops> = (props) => {

    return (
    
        <nav className="navbar navbar-dark px-0 py-3 bg-primary w-100 h-100">
            <span className="navbar-brand logo-lg mb-0 h1">ORDR.</span>
            <ul className="navbar-nav">
                <li className={`nav-item ${props.primary === 'home'?'active':''}`}>
                    <a className="nav-link" href="#/">Home</a>
                </li>
                <li className={`nav-item ${props.primary === 'product'?'active':''}`}>
                    <a className="nav-link" href="#/product">Product</a>
                </li>
                <li className={`nav-item ${props.primary === 'report'?'active':''}`}>
                    <a className="nav-link" href="#/report">Report</a>
                </li>
                <li className={`nav-item ${props.primary === 'costumer'?'active':''}`}>
                    <a className="nav-link" href="#/costumer">Costumer</a>
                </li>
                <li className={`nav-item ${props.primary === 'user'?'active':''}`}>
                    <a className="nav-link" href="#/user">User</a>
                </li>
            </ul>

            <a href="#/config" className="text-light nav-link">
                        <FiSettings size={18} className="mr-2"/> Settings
                    </a>
            {/* <div className="dropdown">
                <button className="btn btn-sm text-white dropdown-toggle"
                 type="button" id="dropdownMenuButton"
                 data-toggle="dropdown"
                 aria-haspopup="true"
                 aria-expanded="false"
                >
                    Hello, {currentUser?.displayName}
                </button>
                <div className="dropdown-menu text-right" aria-labelledby="dropdownMenuButton">
                    <button onClick={LogOut} className="align-items-center d-flex font-weight-bold text-dark dropdown-item">
                        <FiLogOut size={18} className="mr-2"/> Logout
                    </button>
                    <a href="#/config" className="align-items-center font-weight-bold d-flex text-dark dropdown-item">
                        <FiSettings size={18} className="mr-2"/> Settings
                    </a>
                </div>
            </div> */}
        </nav>
  
    );
}

export default NavBar;