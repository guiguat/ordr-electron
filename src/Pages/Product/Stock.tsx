import React, { useState } from 'react';
import { useForms, IProductsData } from '../../Contexts/Forms';

import './Products.scss';
import { FiShoppingBag } from 'react-icons/fi';
import { useApi } from '../../Contexts/Api';


// import { Container } from './styles';

const Stock: React.FC = () => {

    const {prodSelected, setProdSelected } = useForms();
    const {Api} = useApi();

    const [id, setId] = useState(prodSelected.id? prodSelected.id.toString() : "0");
    const [Stock, setStock] = useState(prodSelected.stock?prodSelected.stock.toString() : "0");

    async function handleSubmit(){
        try {    
            const resp = await Api.put("/product", { id, stock:Stock });
            alert(resp.data.message);
            clear();
        } catch (error) {
            alert("An error occurred when trying to reach the server:\n"+error)
        }
    }

    function clear(){
        setId("0");
        setStock("0");
        setProdSelected({} as IProductsData);
    }

    return (
    
        <form onSubmit={handleSubmit} className="container px-4 rounded-lg">
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-info">
                    <FiShoppingBag size={18}  className="mr-2 mb-1"/>
                    Stock
                </button>
            </div>
        </form>
    );
}

export default Stock;