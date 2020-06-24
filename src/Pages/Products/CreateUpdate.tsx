import React, { useState } from 'react';
import { useForms } from '../../Contexts/Forms';

import './Products.scss';
import { FiFilePlus, FiEdit } from 'react-icons/fi';
import { useApi } from '../../Contexts/Api';
import Axios from 'axios';

interface ICreateUpdateProps{
    type:string
}

const Create: React.FC<ICreateUpdateProps> = (props) => {

    const { setBtnClicked } = useForms();
    const {baseURL} = useApi();

    const [id, setId] = useState("");
    const [Name, setName] = useState("");
    const [Price, setPrice] = useState("0.00");
    const [Stock, setStock] = useState("0");
    const [Dish, setDish] = useState("");

    async function handleSubmit(event:any){
        event.preventDefault();
        const data = {
            name:Name,
            price:Price,
            stock:Stock,
            type:Dish==="on"?"dish":""
        }
        const dataPut = {
            id,
            ...data
        }
        try{
            const res = props.type==="create"?
                await Axios.post(`${baseURL}/product`, data)
                :await Axios.put(`${baseURL}/product`, dataPut);
            alert(res.data.message);
            setName("");
            setPrice("");
            setStock("");
            setDish("");
            setBtnClicked("");
        }
        catch(error){
            alert("An error happened when connecting to the server: \n"+ error);
        }
    }

    return (
        <div className="container-fluid mx-auto position-absolute p-0 h-100 onTop">
            <form onSubmit={handleSubmit} className="container bg-light p-4 rounded-lg mt-5">
                <div className="row">
                    <div className="col col-md-6">
                    <h2 className="text-dark font-weight-bold mb-3">Create Product</h2>
                    </div>
                    <div className="col col-md-6">
                    <button type="button" onClick={()=>{setBtnClicked("")}} className="close mb-4" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                </div>
                {
                    props.type==="create"?(<></>):(
                        <div className="form-group">
                            <label htmlFor="id">Id *</label>
                            <input type="number" required value={id}
                            onChange={event=>setId(event.target.value)}
                            className="form-control" id="id"
                            />
                        </div>
                    )
                }
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" required value={Name}
                    onChange={event=>setName(event.target.value)}
                    className="form-control" id="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price *</label>
                    <input type="number" value={Price} 
                    required onChange={event=>setPrice(event.target.value)} 
                    className="form-control" id="price"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock count *</label>
                    <input type="number"
                    value={Stock} 
                    required onChange={event=>setStock(event.target.value)}
                    className="form-control" id="stock"
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="mr-2" htmlFor="typeCheck">Is a dish: </label>
                    <input type="checkbox" onChange={event => setDish(Dish==="on"?"":event.target.value)}
                     id="typeCheck" aria-label="Checkbox if a dish or not"/>
                </div>

                <div className="input-group">
                    <button type="submit" className="btn btn-primary">
                        {
                            props.type === "create"? (
                                <>
                                    <FiFilePlus size={18}  className="mr-2 mb-1"/>
                                    Create Product
                                </>
                            ):(
                                <>
                                    <FiEdit size={18}  className="mr-2 mb-1"/>
                                    Edit Product
                                </>
                            )
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Create;