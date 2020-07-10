import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <div className="container-fluid text-center pt-5 align-items-center justify-content-center py-auto">
          <h1 className="logo-lg mb-3 mt-5">ORDR.</h1>
          <p>The management system made with love for you restaurant</p>
          <span>Support me on 
            <a href="https://github.com/guiguat/ordr-offline-desktop" target="blank"> Github</a>
          </span>
      </div>
    </> 
  );
}

export default Home;