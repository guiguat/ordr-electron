import React, { useState } from "react";

import "./Products.scss";
import { FiFilePlus } from "react-icons/fi";
import { useApi } from "../../Contexts/Api";

interface ICreateFormProps {
  onClose(): void;
}

const Create: React.FC<ICreateFormProps> = ({ onClose }) => {
  const { Api } = useApi();
  const [Stock, setStock] = useState("0");
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("0.00");
  const [Type, setType] = useState("");

  async function handleCreateSubmit(event: any) {
    event.preventDefault();
    const data = {
      name: Name,
      price: Price,
      stock: Stock,
      type: Type,
    };
    try {
      const res = await Api.post("/product", data);
      alert(res.data.message);
      clear();
    } catch (error) {
      alert("An error occurred when trying to reach the server: \n" + error);
    }
  }

  function clear() {
    setName("");
    setPrice("0.00");
    setStock("0");
    setType("");
    if (onClose) onClose();
  }

  return (
    <form onSubmit={handleCreateSubmit} className="container px-4 rounded-lg">
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            required
            value={Name}
            onChange={(event) => setName(event.target.value)}
            className="form-control"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            value={Price}
            required
            onChange={(event) => setPrice(event.target.value)}
            className="form-control"
            id="price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock count *</label>
          <input
            type="number"
            value={Stock}
            required
            onChange={(event) => setStock(event.target.value)}
            className="form-control"
            id="stock"
          />
        </div>
        <div className="form-group mb-3">
          <label className="mr-2" htmlFor="typeCheck">
            Type:{" "}
          </label>
          <select
            className="form-control"
            value={Type}
            onChange={(event) => setType(event.target.value ?? "")}
          >
            <option value="">Product</option>
            <option value="dish">Dish</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="submit"
          disabled={!Stock || !Name || !Price || !(Price === "0.00")}
          className="btn btn-primary"
        >
          <FiFilePlus size={18} className="mr-2 mb-1" />
          Create
        </button>
      </div>
    </form>
  );
};

export default Create;
