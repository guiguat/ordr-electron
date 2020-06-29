import React, { useEffect, useState } from 'react';
import { useApi } from '../../Contexts/Api';

interface ICostumerOrdersProps{
    costumer_id:number
}

interface IProduct{
    name:string,
    price:number
}

const CostumerOrders: React.FC<ICostumerOrdersProps> = ({costumer_id}) => {
    const {Api} = useApi();
    const [orders, setOrders] = useState<Array<IProduct>>([]);
    useEffect(() => {
        async function getOrders(){
            try {
                const response = await Api.get(`/account?costumer_id=${costumer_id}`);
                setOrders(response.data);
            } catch (error) {
                console.log(error);  
            }
        }
        getOrders();
    }, [Api, costumer_id])
    return (
    
        <table className="table">
            <caption>List of orders</caption>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            {
                orders?(
                    <tbody>
                        {
                            orders.map(
                                (product:IProduct, index)=>(
                                    <tr key={index}>
                                        <th scope="row">{product.name}</th>
                                        <td>{product.price}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                ):(<></>)
            }
        </table>

    );
}

export default CostumerOrders;