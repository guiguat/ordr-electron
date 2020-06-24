import React, { useState } from 'react';
import { useForms } from '../../Contexts/Forms';

import './Products.scss';
import { FiShoppingBag } from 'react-icons/fi';
import { useApi } from '../../Contexts/Api';


// import { Container } from './styles';

const Stock: React.FC = () => {

    const { setBtnClicked } = useForms();
    const {Api} = useApi();

    const [id, setId] = useState("");
    const [Stock, setStock] = useState("0");

    async function handleSubmit(){

    }

    return (
    
        <div className="container-fluid mx-auto position-absolute p-0 h-100 onTop">
            <form onSubmit={handleSubmit} className="container bg-light p-4 rounded-lg mt-5">
                <div className="row">
                    <div className="col col-md-6">
                        <h2 className="text-dark font-weight-bold mb-3">Stock Product</h2>
                    </div>
                    <div className="col col-md-6">
                        <button type="button" onClick={()=>{setBtnClicked("")}} className="close mb-4" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="id">Id *</label>
                    <input type="number" required value={id}
                    onChange={event=>setId(event.target.value)}
                    className="form-control" id="id"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Stock">Stock count *</label>
                    <input type="number" required value={Stock}
                    onChange={event=>setStock(event.target.value)}
                    className="form-control" id="Stock"
                    />
                </div>
                <button type="submit" className="btn btn-info">
                    <FiShoppingBag size={18}  className="mr-2 mb-1"/>
                    Stock
                </button>
            </form>
        </div>
    
    );
}

export default Stock;