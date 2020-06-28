import React from 'react';
import { useAuth } from '../../Contexts/Auth';

import './NavBar.scss';
import { FiLogOut, FiSettings } from 'react-icons/fi';

interface Iprops {
    primary:string;
}

const NavBar: React.FC<Iprops> = (props) => {
    const {LogOut, currentUser} = useAuth();
    return (
    
        <nav className="navbar navbar-dark px-5 bg-primary">
            <span className="navbar-brand logo-lg mb-0 h1">ORDR.</span>
            <ul className="navbar-nav row mr-auto mt-2 mt-lg-0">
                <li className={`nav-item ml-5 ${props.primary === 'home'?'active':''}`}>
                    <a className="nav-link" href="#/">Home</a>
                </li>
                <li className={`nav-item ml-3 ${props.primary === 'products'?'active':''}`}>
                    <a className="nav-link" href="#/products">Products</a>
                </li>
                <li className={`nav-item ml-3 ${props.primary === 'report'?'active':''}`}>
                    <a className="nav-link" href="#/report">Report</a>
                </li>
                <li className={`nav-item ml-3 ${props.primary === 'users'?'active':''}`}>
                    <a className="nav-link" href="#/users">Users</a>
                </li>
            </ul>

            <div className="dropdown">
                <button className="btn btn-sm text-white my-2 ml-5 my-sm-0 dropdown-toggle"
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
            </div>
        </nav>
  
    );
}

export default NavBar;