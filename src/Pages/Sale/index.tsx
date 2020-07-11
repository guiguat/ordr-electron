import React from 'react';
import { FiPlus } from 'react-icons/fi';
import Loading from '../../Components/Loading';
import { useApi } from '../../Contexts/Api';
import SaleItem from './SaleItem';

interface Product{
    id: number;
    name: string;
    price: number;
    stock: number;
    type: string
}

interface Sale{
    id:number;
    products:Product[];
    seller_name: string,
    table_num: number,
    date_time: string
}

const Sale: React.FC = () => {

    const {useAxios} = useApi()
    const { data, error } = useAxios<Sale[]>("/sale"); 
    if (error) alert("An error occurred when trying to reach the server:\n"+error);
    if(!data) return (
        <>
            <h3>Sale</h3>
            <a href="#/sale/new" className="btn btn-primary m-3.">
                <FiPlus size={18} className="mr-2"/> New sale
            </a>
            <Loading/>
        </>
    )

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