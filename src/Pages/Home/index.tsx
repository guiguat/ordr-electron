import React from 'react';
import app from '../../firebase';
import Navbar from "../../Components/NavBar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar/>
      <h1>Home</h1>
      <button onClick={()=> app.auth().signOut()}>Sign Out</button>
    </>  
  );
}

export default Home;