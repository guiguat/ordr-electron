import React from 'react';
import Navbar from "../../Components/NavBar";

const Home: React.FC = () => {
  return (
    <div className="container-fluid h-100 w-100 p-0">
      <Navbar primary="home"/>
      <div className="container-fluid text-center pt-5 align-items-center justify-content-center py-auto">
          <h1 className="logo-lg mb-3 mt-5">ORDR.</h1>
          <p>The management system made with love for you restaurant</p>
          <span>Support me on 
            <a href="https://github.com/guiguat/ordr-offline-desktop" target="blank"> Github</a>
          </span>
      </div>
    </div>  
  );
}

export default Home;