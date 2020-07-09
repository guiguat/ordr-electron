import React, { useState } from 'react';
import { useForms, IProductsData } from '../../Contexts/Forms';

import './Products.scss';
import { FiFilePlus, FiEdit } from 'react-icons/fi';
import { useApi } from '../../Contexts/Api';
interface ICreateUpdateProps{
    type:string
}

const CreateUpdate: React.FC<ICreateUpdateProps> = (props) => {

    const { prodSelected, setProdSelected } = useForms();
    const {Api} = useApi();
    const [Id, setId] = useState(prodSelected.id? prodSelected.id.toString() : "0");
    const [Stock, setStock] = useState(prodSelected.stock?prodSelected.stock.toString() : "0");
    const [Name, setName] = useState(prodSelected.name?prodSelected.name:"");
    const [Price, setPrice] = useState(prodSelected.price?prodSelected.price.toString():"0.00");
    const [Dish, setDish] = useState(prodSelected.type?prodSelected.type:"");
    
    async function handleSubmit(event:any){
        event.preventDefault();
        const data = {
            name:Name,
            price:Price,
            stock:Stock,
            type:Dish==="on"?"dish":""
        }
        const dataPut = {
            id:Id,
            ...data
        }
        try{
            const res = props.type==="create"?
                await Api.post("/product", data)
                :await Api.put("/product", dataPut);
            alert(res.data.message);
            clear()
        }
        catch(error){
            alert("An error occurred when trying to reach the server: \n"+ error);
        }
    }

    function clear(){
        setId("0")
        setName("");
        setPrice("0.00");
        setStock("0");
        setDish("");
        setProdSelected({} as IProductsData);
    }

    return (

        <form onSubmit={handleSubmit} className="container px-4 rounded-lg">
            <div className="modal-body">
                {
                    props.type==="create"?(<></>):(
                        <div className="form-group">
                            <label htmlFor="id">Id *</label>
                            <input type="number" required value={Id}
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
            </div>
            <div className="modal-footer">
                <button type="submit" className={`btn ${props.type === 'create'? 'btn-primary':'btn-warning'}`}>
                    {
                        props.type === "create"? (
                            <>
                                <FiFilePlus size={18}  className="mr-2 mb-1"/>
                                Create
                            </>
                        ):(
                            <>
                                <FiEdit size={18}  className="mr-2 mb-1"/>
                                Update
                            </>
                        )
                    }
                </button>
            </div>
        </form>

    );
}

export default CreateUpdate;