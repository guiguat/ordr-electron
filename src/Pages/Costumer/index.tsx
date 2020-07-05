import React, { useState, useEffect } from 'react';
import Container from '../../Components/Container';
import Col from '../../Components/Col';
import NavBar from '../../Components/NavBar';
import { useApi } from '../../Contexts/Api';
import {FiUserPlus, FiTrash2} from 'react-icons/fi'
import CostumerOrders from './CostumerOrders';
import "./Costumer.scss";
interface ICostumer{
    id:number,
    name:string,
    document:string
}

const Costumer: React.FC = () => {
    
    const {Api} = useApi();
    const [name, setName] = useState("");
    const [document, setDocument] = useState("");
    const [costumers, setCostumers] = useState<Array<ICostumer>>([]);

    useEffect(() => {
        async function getCostumers(){
            try {
                const response = await Api.get("/costumer");
                setCostumers(response.data);
            } catch (error) {
                alert("An error occurred when trying to reach the server:\n"+error);
            }
        }
        getCostumers();
    }, [Api])

    async function getCostumers(){
        try {
            const response = await Api.get("/costumer");
            setCostumers(response.data);
        } catch (error) {
            alert("An error occurred when trying to reach the server:\n"+error);
        }
    }

    async function createNewCostumer(event:any){
        event.preventDefault();
        try {
            const data = {
                name,
                document
            }
            const response = await Api.post("/costumer", data);
            alert(response.data.message);
            setName("");
            setDocument("");
            getCostumers();
        } catch (error) {
            alert("An error occurred when trying to reach the server:\n"+error);
        }
    }

    async function deleteCostumer(id:number){
        try {
            const response = await Api.delete(`/costumer?id=${id}`);
            alert(response.data.message);
            getCostumers();
        } catch (error) {
            alert("An error occurred when trying to reach the server:\n"+error);
        }
    }

    return (
        <Container>
            <Col type="nav">
                <NavBar primary="costumer"/>
            </Col>
            <Col>
                <h1 className="mb-4">Costumer</h1>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalNewCostumer">
                    <FiUserPlus/>  Register New
                </button>

                <div className="modal fade" id="modalNewCostumer" tabIndex={-1} role="dialog" aria-labelledby="modalNewCostumerLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalNewCostumerLabel">New Costumer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={createNewCostumer}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="name">Name *</label>
                                        <input type="text" required value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="form-control form-control-sm" id="name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="document">Document *</label>
                                        <input type="text" required value={document}
                                        onChange={e => setDocument(e.target.value)}
                                        className="form-control form-control-sm" id="document"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary w-100" type="submit">
                                        <FiUserPlus className="mb-1 mr-2"/> Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-3 p-0" id="costumers">
                    {
                        costumers?
                        costumers.map(costumer => {
                            return (
                                <div key={costumer.id} className="container-fluid mx-auto mb-4 bg-light rounded-lg p-4">
                                    <div className="row">
                                        <div className="col col-md-11">
                                            <h4 className="m-0">{costumer.name}</h4>
                                            <span className="text-secondary">{costumer.document}</span>
                                        </div>
                                        <div className="col col-md-1">
                                            <button className="btn p-0" onClick={()=>deleteCostumer(costumer.id)}>
                                                <FiTrash2 color="#d73a49" size={24}/>
                                            </button>
                                        </div>
                                    </div>
                                    <CostumerOrders costumer_id={costumer.id}/>
                                </div>
                            )
                        }):<></>
                    }
                </div>
            </Col>
        </Container>
    );
}

export default Costumer;