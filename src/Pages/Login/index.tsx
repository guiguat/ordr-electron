import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/Auth';
import { useHistory, Redirect } from 'react-router';
import app from '../../firebase';

import './loginStyles';

const Login: React.FC = () => {

  const {currentUser} = useContext(AuthContext);

  const history = useHistory();

  async function handleLogIn (event:any){

    event.preventDefault(); 

    const { email, password } = event.target.elements;

    try {
      
      await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(res=>{
          // changeState();
          console.log(res);
        })
      history.push("/");
    } catch (error) {

      alert(error);

    }

    
  };

  if(!!currentUser){
    return <Redirect to="/" />
  }

  return (
    <>
      <form onSubmit={handleLogIn}>
        <label>
          Email:
          <input type="email" name="email" required/>
        </label>
        <br/>
        <label>
          Password:
          <input type="password" name="password" required/>
        </label>
        <button type="submit">LogIn</button>
      </form>
    </>
  );
}

export default Login;