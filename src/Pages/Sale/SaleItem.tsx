import React from 'react';

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
    table_num: number;
    date_time: string
}

interface SaleItemProps{
    data: Sale[]
}

const SaleItem: React.FC<SaleItemProps> = ({data}) => {
    return (
        <div className="container bg-light rounded-lg p-2 pt-3 mt-3">
            {
                data.map((sale: Sale)=>{
                    let total = 0;
                    return(
                    <div key={sale.id} className="container p-2 mb-3 border-bottom">
                        <div className="flex-row p-0 mb-2">
                            <span className="font-weight-bold">{sale.date_time}</span>
                            <span className="font-weight-bold text-secondary mx-3">Seller: {sale.seller_name}</span>
                            <span className="font-weight-bold text-secondary">Table: {sale.table_num}</span>
                        </div>
                        <table className="table table-sm">
                            <caption>List of sold products</caption>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sale.products?.map(
                                        (product:Product,index)=>{
                                            total += product.price;
                                            return(
                                            <tr key={`${product.id}@${index}`}>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                            </tr>
                                        )}
                                    )
                                }
                            </tbody>
                        </table>
                        <h5>Total: R${total.toFixed(2)}</h5>
                    </div>
                )})
            }
        </div>
    );
}

export default SaleItem;