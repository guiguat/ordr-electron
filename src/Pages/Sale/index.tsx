import React from 'react';
import { FiPlus } from 'react-icons/fi';
import Loading from '../../Components/Loading';
import { useApi } from '../../Contexts/Api';
import { ISale } from './models';
import SaleItem from './SaleItem';

const Sale: React.FC = () => {

    const {useAxios} = useApi()
    const { data, error } = useAxios<ISale[]>("/sale"); 
    if (error) alert("An error occurred when trying to reach the server:\n"+error);
    if(!data) return <Loading/>

    return (
        <>
            <h3>Sale</h3>
            <a href="#/sale/new" className="btn btn-primary mt-3">
                <FiPlus size={18} className="mr-2"/> New sale
            </a>
            <SaleItem data={data}/>
        </>
    );
}

export default Sale;