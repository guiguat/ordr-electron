import React from 'react';
import { useApi } from '../../Contexts/Api';

interface ICostumerOrdersProps{
    costumer_id:number
}

interface IProduct{
    name:string,
    price:number
}

const CostumerOrders: React.FC<ICostumerOrdersProps> = ({costumer_id}) => {
    const { useAxios } = useApi();
    const { data, error } = useAxios<IProduct[]>(`/account?costumer_id=${costumer_id}`)

    if(error) console.log(error);
    if (!data) return <p>Loading...</p>

    return (
    
        <table className="table">
            <caption>List of orders</caption>
            <thead>
                <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map(
                        (product:IProduct, index)=>(
                            <tr key={index}>
                                <th scope="row">{product.name}</th>
                                <td>{product.price}</td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>

    );
}

export default CostumerOrders;