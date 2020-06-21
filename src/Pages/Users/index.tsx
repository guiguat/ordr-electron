import React, {  useState, FormEvent } from 'react';
import Navbar from '../../Components/NavBar';
import { useAuth } from '../../Contexts/Auth';
import './Users.scss';

const Users: React.FC = () => {
  const {currentUser, SignUp} = useAuth();
  const [btnClicked, setBtnClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event:FormEvent){
    event.preventDefault();
    const data = {
      email,
      password,
      name
    }
    SignUp(data);
    setName("");
    setEmail("");
    setPassword("");
    setBtnClicked(false);
  }

  return (
      <div className="h-100 p-0 m-0">
        <Navbar/>

        {
          btnClicked?(
          <div className="container-fluid mx-auto position-absolute p-0 h-full" id="ContainerNewUser">
            <form onSubmit={handleSubmit} className="container bg-light p-4 rounded-lg mt-5">
              <h2 className="text-dark font-weight-bold mb-3">New User</h2>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" value={name} onChange={event=>setName(event.target.value)}
                 className="form-control" id="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" value={email} onChange={event=>setEmail(event.target.value)} 
                 className="form-control" id="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={event=>setPassword(event.target.value)}
                 className="form-control" id="password"
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          ):(<></>)
        } 
        
        <div className="container-fluid ">
          <div className="container bg-light rounded-lg p-5 mt-5">
            <h1 className="text-dark font-weight-bold mb-3">Current User Info</h1>
            <h2 className="text-dark">Name: {currentUser?.displayName}</h2>
            <h2 className="text-dark">Email: {currentUser?.email}</h2>
            <button className="btn btn-primary w-100 mt-5" onClick={()=>setBtnClicked(true)}>
              Register New
            </button>
          </div>
        </div>
      </div>
  );
}

export default Users;