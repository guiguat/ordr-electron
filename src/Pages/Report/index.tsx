import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar';
import { FiFilePlus, FiRefreshCcw } from 'react-icons/fi';
import { useApi } from '../../Contexts/Api';

import './Report.scss';

interface IReportData{
    id:number,
    dateTime:string
    debit:number
    credit:number,
    cash:number,
    total:number
}

const Report: React.FC = () => {

    const {Api} = useApi();
    const [reportData, setReportData] = useState<Array<IReportData>>([]);

    useEffect(() => {
        getReports();
    })

    async function getReports(){
        try {
            const response = await Api.get('/report');
            setReportData(response.data);
        } catch (error) {
            alert("An error occurred when trying to reach the server:\n"+error)
        }
    }

    async function openReport(){
        try {
            const response = await Api.post('/report');
            alert(response.data.message);
            getReports();
        } catch (error) {
            alert("An error occurred when trying to reach the server:\n"+error)
        }
    }

    return (  
        <div className="row m-0 p-0 d-flex h-100 w-100">
            <div className="col col-md-2 h-100 p-0">
                <NavBar primary="report"/>
            </div>
            <div className="col col-md-10  h-100">
                <header className="container mb-0 position-sticky bg-white p-3">
                    <ul className="row m-0 px-auto">
                        <li className="col col-md-1">
                            <button 
                                className="btn bg-light shadow-sm text-success"
                                onClick={getReports}
                            >
                                <FiRefreshCcw size={18}/>
                            </button>
                        </li>
                        <li className="col col-md-2">
                            <button 
                                className="btn bg-light shadow-sm text-success"
                                onClick={openReport}
                            >
                                <FiFilePlus size={18} className="mb-1 mr-2"/>
                                Open new
                            </button>
                        </li>
                    </ul>
                </header>
                <div className="container bg-white">
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
                        {
                            reportData?(
                                <tbody>
                                    {
                                        reportData.map(
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
                            ):(<></>)
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Report;