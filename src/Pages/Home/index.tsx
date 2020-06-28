import React from 'react';
import NavBar from "../../Components/NavBar";

const Home: React.FC = () => {
  return (
    <div className="row m-0 p-0 d-flex h-100 w-100">
      <div className="col col-md-2 h-100 p-0">
          <NavBar primary="home"/>
      </div>
      <div className="col col-md-10  h-100">
        <div className="container-fluid text-center pt-5 align-items-center justify-content-center py-auto">
            <h1 className="logo-lg mb-3 mt-5">ORDR.</h1>
            <p>The management system made with love for you restaurant</p>
            <span>Support me on 
              <a href="https://github.com/guiguat/ordr-offline-desktop" target="blank"> Github</a>
            </span>
        </div>
      </div>
    </div>  
  );
}

export default Home;