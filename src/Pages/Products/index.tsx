import React, {useState, useEffect} from 'react';

import './Products.scss';
import NavBar from '../../Components/NavBar';
import {FiPlus, FiEdit, FiTrash2, FiShoppingBag} from 'react-icons/fi';
import CreateUpdate from './CreateUpdate';
import { useForms } from '../../Contexts/Forms';
import { useApi } from '../../Contexts/Api';

interface IProductsData{
    id: number,
    name: string,
    price: number,
    stock: number,
    type: string
}

const Products: React.FC = () => {
    const { btnClicked, setBtnClicked } = useForms();
    const {Api} = useApi();
    const [tableData, setTableData] = useState<Array<IProductsData>>([]);

    useEffect(()=>{
        async function getProdutos(){
            try {
                const response = await Api.get("/product");
                setTableData(response.data);
            } catch (error) {
                alert("An error occurred when trying to reach the server:\n"+error);
            }
        }
        if(btnClicked === "")getProdutos();
    },[]);

    if(btnClicked === "create_products") return <CreateUpdate type="create"/>
    if(btnClicked === "update_products") return <CreateUpdate type="update"/>
    
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
                    {
                        tableData?(
                            <tbody>
                                {
                                    tableData.map(
                                        (product:IProductsData)=>(
                                            <tr>
                                                <th scope="row">{product.id}</th>
                                                <td colSpan={2}>{product.name}</td>
                                                <td colSpan={product.type===""?1:2}>{product.price}</td>
                                                <td className={`${product.type===""?"":"d-none"}`}>{product.stock}</td>
                                                <td>{product.type===""?"":product.type}</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        ):(<></>)
                    }
                </table>
            </div>
        </>
    );
}

export default Products;