import React, {  useState, FormEvent } from 'react';
import { FiEdit, FiLogOut, FiUserPlus, FiUserX } from 'react-icons/fi';
import './Users.scss';
import { useAuth } from '../../Contexts/Auth';

const Users: React.FC = () => {
    const {currentUser, SignUp, DeleteUser, UpdateUser, LogOut} = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [formType, setFormType] = useState("");

    function handleNewUser(event:FormEvent){
        event.preventDefault();
        const data = {
        email,
        password,
        name
        }
        SignUp(data);
        clear();
    }

    function handleDelete(){
        DeleteUser(email, password);
        clear();
    }

    function handleUpdate(){
        const data={
        email,
        password,
        newName: newName===""?null:newName,
        newEmail: newEmail===""?null:newEmail,
        newPassword: newPwd===""?null:newPwd
        }
        UpdateUser(data);
        clear();
    }

    function handleManage(event:any){
        event.preventDefault();
        if(formType==="up") handleUpdate();
        if(formType==="del") handleDelete();
    }

    function clear(){
        setEmail("");
        setPassword("");
        setNewName("");
        setNewPwd("");
        setNewEmail("");
    }

    return (
        <>
            {/* modals */}
            <div className="modal fade" id="newUserModal" tabIndex={-1} role="dialog" aria-labelledby="newUserModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newUserModalLabel">New User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleNewUser} className="container px-4 rounded-lg ">
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Name *</label>
                                    <input type="text" value={name} required 
                                    onChange={event=>setName(event.target.value)}
                                    className="form-control" id="name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address *</label>
                                    <input type="email" value={email} required 
                                    onChange={event=>setEmail(event.target.value)} 
                                    className="form-control" id="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password *</label>
                                    <input type="password" value={password} required 
                                    onChange={event=>setPassword(event.target.value)}
                                    className="form-control" id="password"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">
                                        <FiUserPlus className="mr-2"/>
                                        Create
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="manageModal" tabIndex={-1} role="dialog" aria-labelledby="manageModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="manageModalLabel">New User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleManage} className="container px-4 rounded-lg ">
                            <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="email">Email address *</label>
                                <input type="email" value={email} required onChange={event=>setEmail(event.target.value)} 
                                className="form-control" id="email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password *</label>
                                <input type="password" value={password} required onChange={event=>setPassword(event.target.value)}
                                className="form-control" id="password"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newName">New name <span className="text-warning">(optional)</span></label>
                                <input type="text" value={newName} onChange={event=>setNewName(event.target.value)}
                                className="form-control" id="newName"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newEmail">New Email <span className="text-warning">(optional)</span></label>
                                <input type="email" value={newEmail} onChange={event=>setNewEmail(event.target.value)}
                                className="form-control" id="newEmail"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPwd">New Password <span className="text-warning">(optional)</span></label>
                                <input type="password" value={newPwd} onChange={event=>setNewPwd(event.target.value)}
                                className="form-control" id="newPwd"
                                />
                            </div>
                                <div className="modal-footer">
                                    <button onClick={()=>setFormType("up")} 
                                    type="submit" className="btn btn-warning mr-3"
                                    >
                                        <FiEdit className="mr-2"/>
                                        Update
                                    </button>
                                    <button onClick={()=>setFormType("del")} 
                                    type="submit" className="btn btn-danger"
                                    >
                                        <FiUserX className="mr-2"/>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* end modals */}
            <div className="container bg-light rounded-lg p-4">
                <h3 className="font-weight-bold">Users</h3>
                <h5>Name: {currentUser?.displayName}</h5>
                <h5>Email: {currentUser?.email}</h5>
                <div className="row">
                    <button className="btn btn-primary w-100 col mt-4 mx-3" data-toggle="modal" data-target="#newUserModal">
                        <FiUserPlus className="mr-3" />
                        Register New
                    </button>
                    <button className="btn btn-warning w-100 col mt-4 mx-3" data-toggle="modal" data-target="#manageModal">
                        <FiEdit className="mr-3"/>
                        Manage Users
                    </button>
                    <button className="btn btn-danger w-100 col mt-4 mx-3" onClick={()=>LogOut()}>
                        <FiLogOut className="mr-3"/>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default Users;