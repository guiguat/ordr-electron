import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/Auth';
import { useHistory, Redirect } from 'react-router';
import app from '../../firebase';

import './loginStyles.scss';
import '../../custom.scss';

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
    <div className="container-fluid p-5">
      <form onSubmit={handleLogIn}>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name="email" id="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required className="form-control" id="password"/>
        </div>
    
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;