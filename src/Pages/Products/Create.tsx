import React from 'react';
import { useForms } from '../../Contexts/Forms';

import './Products.scss';

const Create: React.FC = () => {

    const { setBtnClicked } = useForms();

    return (
        <div className="container-fluid mx-auto position-absolute p-0 h-100 onTop">
            <form onSubmit={()=>{}} className="container bg-light p-4 rounded-lg mt-5">
                <div className="row">
                    <div className="col col-md-6">
                    <h2 className="text-dark font-weight-bold mb-3">New User</h2>
                    </div>
                    <div className="col col-md-6">
                    <button type="button" onClick={()=>{setBtnClicked("")}} className="close mb-4" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" value={"name"} required onChange={event=>{}}
                    className="form-control" id="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address *</label>
                    <input type="email" value={"email"} required onChange={event=>{}} 
                    className="form-control" id="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input type="password" value={"password"} required onChange={event=>{}}
                    className="form-control" id="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create user</button>
            </form>
        </div>
    );
}

export default Create;