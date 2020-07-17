import React from 'react';

import './NavBar.scss';
import { FiActivity, FiDollarSign, FiHome, FiSettings, FiShoppingBag, FiUsers } from 'react-icons/fi';

const NavBar: React.FC = () => {

    return (
    
        <nav className="navbar navbar-dark px-0 py-3 bg-primary w-100 h-100">
            <span className="navbar-brand logo-lg mb-0 h1">ORDR.</span>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#/">
                        <FiHome size={18} className="mr-2"/> Home
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/product">
                        <FiShoppingBag size={18} className="mr-2"/> Product
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/report">
                        <FiActivity size={18} className="mr-2"/> Report
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/sale">
                        <FiDollarSign size={18} className="mr-2"/> Sale
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#/costumer">
                        <FiUsers size={18} className="mr-2"/> Costumer
                    </a>
                </li>
            </ul>

            <a href="#/config" className="text-light nav-link nav-item">
                <FiSettings size={18} className="mr-2"/> Settings
            </a>
        </nav>
  
    );
}

export default NavBar;