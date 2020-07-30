import React from "react";
import { FiInbox } from "react-icons/fi";
import Loading from "../../Components/Loading";
import { useApi } from "../../Contexts/Api";
import { ICostumerOrdersProps, IOrderProduct } from "./models";

const CostumerOrders: React.FC<ICostumerOrdersProps> = ({ costumer_id }) => {
  const { useAxios, Api } = useApi();
  const { data, error } = useAxios<IOrderProduct[]>(
    `/account?costumer_id=${costumer_id}`
  );

  if (error) console.log(error);
  if (!data) return <Loading />;

  if (data.length === 0)
    return (
      <p className="text-grey-800 mt-3 font-weight-bold ">
        Nothing purchased yet!
      </p>
    );

  let total = 0.0;
  data.forEach((product: IOrderProduct) => (total += product.price));

  async function handleFinishPurchase() {
    try {
      const res = await Api.delete(`/account?costumer_id=${costumer_id}`);
      alert(res.data.message);
    } catch (error) {
      alert("An error occurred when trying to reach the server: \n" + error);
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
          {data?.map((o: IOrderProduct, index) => (
            <tr key={index}>
              <td>{o.order}</td>
              <td>{`R$${o.price.toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="font-weight-bold text-grey-800">
        TOTAL: R${total.toFixed(2)}
      </span>
      <br />
      <br />
      <button className="btn btn-dark" onClick={handleFinishPurchase}>
        <FiInbox size={18} className="mr-2" /> Finish sale
      </button>
    </div>
  );
};

export default CostumerOrders;
