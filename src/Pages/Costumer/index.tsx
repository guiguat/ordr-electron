import React, { useState } from 'react';
import Container from '../../Components/Container';
import Col from '../../Components/Col';
import NavBar from '../../Components/NavBar';
import { useApi } from '../../Contexts/Api';
import {FiUserPlus} from 'react-icons/fi'
const Costumer: React.FC = () => {
    
    const {Api} = useApi();
    const [name, setName] = useState("");
    const [document, setDocument] = useState("");

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
                <div className="container-fluid mx-auto bg-light rounded-lg p-4 text-dark">
                    <h3>New Costumer</h3>
                    <form onSubmit={createNewCostumer} className="mt-3 mb-2">
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
                        <button className="btn btn-primary w-100" type="submit">
                           <FiUserPlus className="mb-1 mr-2"/> Create
                        </button>
                    </form>
                </div>
                <div className="container-fluid mt-5">

                </div>
            </Col>
        </Container>
    );
}

export default Costumer;