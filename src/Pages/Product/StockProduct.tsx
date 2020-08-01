import React from "react";

import Modal from "react-bootstrap/Modal";

import { IProductForm } from "./models/index";
import { useForms } from "../../Contexts/Forms";
import { useApi } from "../../Contexts/Api";
import { FiShoppingBag } from "react-icons/fi";

const StockProduct: React.FC<IProductForm> = ({ onClear }) => {
  const { prodSelected, setProdSelected } = useForms();
  const { Api } = useApi();

  async function handleStockSubmit() {
    try {
      const resp = await Api.put("/product", {
        id: prodSelected.id ? prodSelected.id.toString() : "0",
        stock: prodSelected.stock ? prodSelected.stock.toString() : "0",
      });
      alert(resp.data.message);
      onClear("stock");
    } catch (error) {
      alert("An error occurred when trying to reach the server:\n" + error);
    }
  }

  return (
    <form onSubmit={handleStockSubmit} className="container px-4 rounded-lg">
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="id">Id *</label>
          <input
            type="number"
            required
            value={prodSelected.id}
            onChange={(event) =>
              setProdSelected({
                ...prodSelected,
                id: parseInt(event.target.value),
              })
            }
            className="form-control"
            id="id"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Stock">Stock count *</label>
          <input
            type="number"
            required
            value={prodSelected.stock}
            onChange={(event) =>
              setProdSelected({
                ...prodSelected,
                stock: parseInt(event.target.value),
              })
            }
            className="form-control"
            id="Stock"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          disabled={!prodSelected.id}
          className="btn btn-info"
        >
          <FiShoppingBag size={18} className="mr-2 mb-1" />
          Stock
        </button>
      </Modal.Footer>
    </form>
  );
};

export default StockProduct;
