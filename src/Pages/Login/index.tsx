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
    <div className="container-fluid p-5 align-items-center h-100 justify-content-center">
      <div className="row mx-auto h-100">

        <div className="col pl-5">

          <h1 className="logo-lg mb-5">ORDR.</h1>
          <h2 className="text-dark">Sign-In</h2>

          <form className="my-4" onSubmit={handleLogIn}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" name="email" id="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" required className="form-control" id="password"/>
            </div>
        
            <button type="submit" className="btn btn-primary w-100">Sign-In</button>
          </form>

        </div>

        <div className="col p-0 illustration">
          {/* <Illustration className="illustration float-right"/> */}
        </div>

      </div>
    </div>
  );
}

export default Login;