import React from 'react';

import './Products.scss';
import NavBar from '../../Components/NavBar';
import { FiPlus, FiEdit, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import CreateUpdate from './CreateUpdate';
import { useForms } from '../../Contexts/Forms';
import { useApi } from '../../Contexts/Api';
import Stock from './Stock';
import Container from '../../Components/Container';
import Col from '../../Components/Col';

interface IProductsData{
    id: number,
    name: string,
    price: number,
    stock: number,
    type: string
}

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
                }
                else throw new Error("Please select a product from the table below");
                
            } catch (e) {
                alert("An error occurred when trying to reach the server:\n"+e)
            }
        }
    }

    return (
        <Container>
            <Col type="nav">
                <NavBar primary="product"/>
            </Col>
            <Col>
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
                            <CreateUpdate type="create"/>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="updateModal" tabIndex={-1} role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateModalLabel">Update Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <CreateUpdate type="update"/>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="stockModal" tabIndex={-1} role="dialog" aria-labelledby="stockModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="stockModalLabel">Stock Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <Stock/>
                        </div>
                    </div>
                </div>

                <h1 className="mb-2">Product</h1>
                <header className="container mb-0 position-sticky bg-white py-3">
                    <ul className="row m-0 px-auto">
                        {/* <li className="col col-md-1">
                            <button 
                                className="btn bg-light shadow-sm text-success"
                                onClick={getProducts}
                            >
                                <FiRefreshCcw size={18}/>
                            </button>
                        </li> */}
                        <li className="col col-md-2">
                            <button 
                                className="btn bg-light shadow-sm text-success"
                                data-toggle="modal" data-target="#createModal"
                            >
                                <FiPlus size={18} className="mb-1 mr-2"/>
                                Create
                            </button>
                        </li>
                        <li className="col col-md-2">
                            <button
                            className="btn bg-light shadow-sm text-warning"
                            data-toggle="modal" data-target="#updateModal"
                            >
                                <FiEdit size={18} className="mb-1 mr-2"/>
                                Update
                            </button>
                        </li>
                        <li className="col col-md-2">
                            <button
                            className="btn bg-light shadow-sm text-danger"
                            onClick={delProduct}
                            >
                                <FiTrash2 size={18} className="mb-1 mr-2"/>
                                Delete
                            </button>
                        </li>
                        <li className="col col-md-2">
                            <button
                            className="btn bg-light shadow-sm text-info"
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
                    {

                        <tbody>
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

                    }
                </table>
            </Col>
        </Container>
    );
}

export default Products;