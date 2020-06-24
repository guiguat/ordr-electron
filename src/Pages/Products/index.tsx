import React, { useState } from 'react';

import './Products.scss';
import NavBar from '../../Components/NavBar';
import {FiPlus, FiEdit, FiTrash2, FiShoppingBag} from 'react-icons/fi';
import Create from './Create';
import { useForms } from '../../Contexts/Forms';

const Products: React.FC = () => {
    
    const { btnClicked, setBtnClicked } = useForms();

    if(btnClicked === "create_products") return <Create/>

    return (
        <>
            <NavBar primary="products"/>
            <header className="container mb-0 position-sticky bg-white p-3">
                <ul className="row m-0 px-auto">
                    <li className="col">
                        <button 
                            className="btn bg-light shadow-sm text-success"
                            onClick={()=> setBtnClicked("create_products")}
                        >
                            <FiPlus size={18} className="mb-1 mr-2"/>
                            Create
                        </button>
                    </li>
                    <li className="col">
                        <button
                         className="btn bg-light shadow-sm text-warning"
                         onClick={()=> setBtnClicked("update_products")}
                         >
                            <FiEdit size={18} className="mb-1 mr-2"/>
                            Update
                        </button>
                    </li>
                    <li className="col">
                        <button
                         className="btn bg-light shadow-sm text-danger"
                         onClick={()=> setBtnClicked("del_products")}
                        >
                            <FiTrash2 size={18} className="mb-1 mr-2"/>
                            Delete
                        </button>
                    </li>
                    <li className="col">
                        <button
                         className="btn bg-light shadow-sm text-info"
                         onClick={()=> setBtnClicked("stock_products")}
                        >
                            <FiShoppingBag size={18} className="mb-1 mr-2"/>
                            Stock
                        </button>
                    </li>
                </ul>
            </header>
            <div className="container bg-white">
                <table className="table table-sm table-hover">
                    <caption>List of products</caption>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col" colSpan={2}>Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td colSpan={2}>Mark</td>
                            <td colSpan={2}>20.50</td>
                            <td>dish</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td colSpan={2}>Jacob</td>
                            <td>12.05</td>
                            <td colSpan={2}>143</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colSpan={2}>Larry the Bird</td>
                            <td colSpan={2}>13.22</td>
                            <td>dish</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Products;