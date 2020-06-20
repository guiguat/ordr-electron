import React from 'react';
import app from '../../firebase';

// import './styles';

const Home: React.FC = () => {
  return (
    <>
      <h1>Home</h1>
      <button onClick={()=> app.auth().signOut()}>Sign Out</button>
    </>  
  );
}

export default Home;