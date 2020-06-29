import React from 'react';
import NavBar from "../../Components/NavBar";
import Container from '../../Components/Container';
import Col from '../../Components/Col';

const Home: React.FC = () => {
  return (
    <Container>
      <Col type="nav">
        <NavBar primary="home"/>
      </Col>
      <Col>
        <div className="container-fluid text-center pt-5 align-items-center justify-content-center py-auto">
            <h1 className="logo-lg mb-3 mt-5">ORDR.</h1>
            <p>The management system made with love for you restaurant</p>
            <span>Support me on 
              <a href="https://github.com/guiguat/ordr-offline-desktop" target="blank"> Github</a>
            </span>
        </div>
      </Col>   
    </Container>  
  );
}

export default Home;