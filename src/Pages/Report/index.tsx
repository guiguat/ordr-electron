import React from 'react';
import NavBar from '../../Components/NavBar';
import { FiFilePlus } from 'react-icons/fi';
import { useApi } from '../../Contexts/Api';
import Container from '../../Components/Container';
import Col from '../../Components/Col';
import "../../custom.scss"
interface IReportData{
    id:number,
    dateTime:string
    debit:number
    credit:number,
    cash:number,
    total:number
}

const Report: React.FC = () => {

    const {Api, useAxios} = useApi();

    const {data, error} = useAxios<IReportData[]>("/report");

    if(error) alert("An error occurred when trying to reach the server:\n"+error);

    if(!data) return <p>Loading...</p>

    async function openReport(){
        try {
            const response = await Api.post('/report');
            alert(response.data.message);
        } catch (error) {
            alert("An error occurred when trying to reach the server:\n"+error)
        }
    }

    return (  
        <Container>
            <Col type="nav">
                <NavBar primary="report"/>
            </Col>
            <Col>
                <h1 className="mb-1">Report</h1>

                <button 
                    className="btn shadow-sm btn-success my-3"
                    onClick={openReport}
                >
                    <FiFilePlus size={18} className="mb-1 mr-2"/>
                    Open new
                </button>

                <table className="table">
                    <caption>List of reports</caption>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Debit</th>
                            <th scope="col">Credit</th>
                            <th scope="col">Cash</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(
                                (report:IReportData)=>(
                                    <tr key={report.id}>
                                        <th scope="row">{report.dateTime}</th>
                                        <td>{report.debit}</td>
                                        <td>{report.credit}</td>
                                        <td>{report.cash}</td>
                                        <td>{report.total}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </Col>
        </Container>
    );
}

export default Report;