import React from 'react';
import { FiInbox } from 'react-icons/fi';
import { useApi } from '../../Contexts/Api';

interface ICostumerOrdersProps{
    costumer_id:number
}

interface IProduct{
    order:string,
    price:number
}

const CostumerOrders: React.FC<ICostumerOrdersProps> = ({costumer_id}) => {
    const { useAxios, Api } = useApi();
    const { data, error } = useAxios<IProduct[]>(`/account?costumer_id=${costumer_id}`)

    if(error) console.log(error);
    if (!data) return <p>Loading...</p>

    if(data.length === 0) return <p className="text-grey-800 mt-3 font-weight-bold ">No orders for now!</p>

    async function handleFinishPurchase(){
        try{
            const res = await Api.delete(`/account?costumer_id=${costumer_id}`)
            alert(res.data.message);
        }
        catch(error){
            alert("An error occurred when trying to reach the server: \n"+ error);
        }
    }

    return (
    
        <div className="container">
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
                                    <td>{product.order}</td>
                                    <td>{`R$${product.price.toFixed(2)}`}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            <button className="btn btn-dark" onClick={handleFinishPurchase}>
                <FiInbox size={18} className="mr-2"/> Finish purchase
            </button>
        </div>
    );
}

export default CostumerOrders;