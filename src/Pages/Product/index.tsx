import React from 'react';

import './Products.scss';
import { FiPlus, FiEdit, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import Create from './Create';
import { useForms } from '../../Contexts/Forms';
import { useApi } from '../../Contexts/Api';
import { IProductsData } from '../../models';

const Products: React.FC = () => {
    const { setProdSelected, prodSelected } = useForms();
    const {Api, useAxios} = useApi();

    const { data, error } = useAxios<IProductsData[]>("/product")

    if (error) alert("An error occurred when trying to reach the server:\n"+error);

    if(!data) return <p>Loading...</p>

    async function delProduct(){
        const answer = window.confirm("Do you really want to delete "+prodSelected.name+" from the database?")
        if(answer){
            try {

                if(prodSelected.id){
                    const response = await Api.delete(`/product?id=${prodSelected.id}`)
                    alert(response.data.message);
                    clear();
                }
                else throw new Error("Please select a product from the table below");
                
            } catch (e) {
                alert("An error occurred when trying to reach the server:\n"+e)
            }
        }
    }

    async function handleStockSubmit(){
        try {    
            const resp = await Api.put("/product", { 
                id: prodSelected.id? prodSelected.id.toString() : "0",
                stock:prodSelected.stock? prodSelected.stock.toString() : "0"
            });
            alert(resp.data.message);
            clear();
        } catch (error) {
            alert("An error occurred when trying to reach the server:\n"+error)
        }
    }

    async function handleUpdateSubmit(event:any){
        event.preventDefault();
        const data = {
            id:prodSelected.id??0,
            name: prodSelected.name??"",
            price: prodSelected.price??0,
            stock: prodSelected.stock??0,
            type: prodSelected.type,
        }
        try{

            const res = await Api.put("/product", data);
            alert(res.data.message);
            clear()
        }
        catch(error){
            alert("An error occurred when trying to reach the server: \n"+ error);
        }
    }

    function clear(){
        setProdSelected({} as IProductsData);
    }

    return (
        <>
            {/* modals */}
            <div className="modal fade" id="createModal" tabIndex={-1} role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createModalLabel">Create Product</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <Create/>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="updateModal" tabIndex={-1} role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLabel">Update Product</h5>
                            <button type="button" onClick={()=>clear()} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* UpdateForm */}
                        <form onSubmit={handleUpdateSubmit} className="container px-4 rounded-lg">
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="id">Id *</label>
                                    <input type="number" required value={prodSelected.id??0}
                                    onChange={event=>setProdSelected({ ...prodSelected, id: parseInt(event.target.value) })}
                                    className="form-control" id="id"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name *</label>
                                    <input type="text" required value={prodSelected.name??""}
                                    onChange={event=>setProdSelected({ ...prodSelected, name: event.target.value })}
                                    className="form-control" id="name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price *</label>
                                    <input type="number" value={prodSelected.price??0.00} 
                                    required 
                                    onChange={event=>setProdSelected({...prodSelected, price: parseFloat(event.target.value)})} 
                                    className="form-control" id="price"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock">Stock count *</label>
                                    <input type="number"
                                    value={prodSelected.stock??0} 
                                    required onChange={event=>setProdSelected({...prodSelected, stock: parseInt(event.target.value)})}
                                    className="form-control" id="stock"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="mr-2" htmlFor="typeCheck">Type: </label>
                                    <select 
                                    className="form-control"
                                    value={prodSelected.type}
                                    onChange={event => setProdSelected({ ...prodSelected, type: event.target.value??"" })}>
                                        <option value="">Product</option>
                                        <option value="dish">Dish</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" disabled={!prodSelected.name || !prodSelected.price || !prodSelected.id} className="btn btn-primary">
                                    <FiEdit size={18}  className="mr-2 mb-1"/>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="stockModal" tabIndex={-1} role="dialog" aria-labelledby="stockModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="stockModalLabel">Stock Product</h5>
                            <button type="button" onClick={()=>clear()} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* Stock form */}
                        <form onSubmit={handleStockSubmit} className="container px-4 rounded-lg">
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="id">Id *</label>
                                    <input type="number" required value={prodSelected.id}
                                    onChange={event=>setProdSelected({...prodSelected, id: parseInt(event.target.value)})}
                                    className="form-control" id="id"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Stock">Stock count *</label>
                                    <input type="number" required value={prodSelected.stock}
                                    onChange={event=>setProdSelected({...prodSelected, stock: parseInt(event.target.value)})}
                                    className="form-control" id="Stock"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" disabled={!prodSelected.id} className="btn btn-info">
                                    <FiShoppingBag size={18}  className="mr-2 mb-1"/>
                                    Stock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <h3 className="mb-2">Product</h3>
            <header className="container mb-0 position-sticky bg-white py-3">
                <ul className="row m-0 px-auto">
                    <li className="col col-md-2">
                        <button 
                            className="btn shadow-sm btn-success"
                            data-toggle="modal" data-target="#createModal"
                        >
                            <FiPlus size={18} className="mb-1 mr-2"/>
                            Create
                        </button>
                    </li>
                    <li className="col col-md-2">
                        <button
                        className="btn shadow-sm btn-warning"
                        data-toggle="modal" data-target="#updateModal"
                        >
                            <FiEdit size={18} className="mb-1 mr-2"/>
                            Update
                        </button>
                    </li>
                    <li className="col col-md-2">
                        <button
                        className="btn shadow-sm btn-danger"
                        disabled={!prodSelected.id}
                        onClick={delProduct}
                        >
                            <FiTrash2 size={18} className="mb-1 mr-2"/>
                            Delete
                        </button>
                    </li>
                    <li className="col col-md-2">
                        <button
                        className="btn shadow-sm btn-info"
                        data-toggle="modal" data-target="#stockModal"
                        >
                            <FiShoppingBag size={18} className="mb-1 mr-2"/>
                            Stock
                        </button>
                    </li>
                </ul>
            </header>
            <table className="table table-hover">
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
                <tbody className="table-products">
                    {
                        data?.map(
                            (product:IProductsData)=>(
                                <tr className={`${prodSelected.id === product.id? "bg-secondary text-white" :""}`}
                                onClick={()=>setProdSelected(product)}
                                key={product.id}
                                >
                                    <th scope="row">{product.id}</th>
                                    <td colSpan={2}>{product.name}</td>
                                    <td colSpan={product.type===""?1:2}>{product.price}</td>
                                    <td className={`${product.type===""?"":"d-none"}`}>{product.stock}</td>
                                    <td>{product.type===""?"":product.type.toUpperCase()}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default Products;