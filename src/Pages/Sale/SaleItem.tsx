import React from 'react';
import { IProduct } from '../Product/models';
import { ISale, ISaleItemProps } from './models';

const SaleItem: React.FC<ISaleItemProps> = ({data}) => {
    return (
        <div className="container bg-light rounded-lg p-2 pt-3 mt-3">
            {
                data.map((sale: ISale)=>{
                    let total = 0;
                    return(
                    <div key={sale.id} className="container p-2 mb-3 border-bottom">
                        <div className="flex-row p-0 mb-2">
                            <span className="font-weight-bold">{sale.date_time}</span>
                            <span className="text-secondary mx-3">Seller: {sale.seller_name}</span>
                            <span className="text-secondary">Table: {sale.table_num}</span>
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
                                        (product:IProduct,index)=>{
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