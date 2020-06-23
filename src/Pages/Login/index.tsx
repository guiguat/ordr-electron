import React from 'react';
import { useAuth } from '../../Contexts/Auth';
import { useHistory, Redirect } from 'react-router';

import './loginStyles.scss';

const Login: React.FC = () => {

  const {currentUser, LogIn} = useAuth();

  const history = useHistory();

  async function handleLogIn (event:any){

    event.preventDefault(); 

    const { email, password } = event.target.elements;

    LogIn(email.value, password.value);
    history.push("/");
    
  };

  if(!!currentUser){
    return <Redirect to="/" />
  }

  return (
    <div className="container-fluid p-5 align-items-center h-100 justify-content-center">
      <div className="row mx-auto h-100">

        <div className="col pl-5">

          <h1 className="logo-lg mb-5">ORDR.</h1>
          <h2 className="text-dark">Login</h2>

          <form className="my-4" onSubmit={handleLogIn}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" name="email" id="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" required className="form-control" id="password"/>
            </div>
        
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

        </div>

        <div className="col p-0 illustration"/>

      </div>
    </div>
  );
}

export default Login;