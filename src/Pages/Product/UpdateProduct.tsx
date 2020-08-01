import React from "react";

import Modal from "react-bootstrap/Modal";
import { FiEdit } from "react-icons/fi";

import { IProductForm } from "./models/index";
import { useForms } from "../../Contexts/Forms";
import { useApi } from "../../Contexts/Api";

const UpdateProduct: React.FC<IProductForm> = ({ onClear }) => {
  const { prodSelected, setProdSelected } = useForms();
  const { Api } = useApi();
  async function handleUpdateSubmit(event: any) {
    event.preventDefault();
    const data = {
      id: prodSelected.id ?? 0,
      name: prodSelected.name ?? "",
      price: prodSelected.price ?? 0,
      stock: prodSelected.stock ?? 0,
      type: prodSelected.type,
    };
    try {
      const res = await Api.put("/product", data);
      alert(res.data.message);
      onClear("update");
    } catch (error) {
      alert("An error occurred when trying to reach the server: \n" + error);
    }
  }

  return (
    <form onSubmit={handleUpdateSubmit} className="container px-4 rounded-lg">
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="id">Id *</label>
          <input
            type="number"
            required
            value={prodSelected.id ?? 0}
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
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            required
            value={prodSelected.name ?? ""}
            onChange={(event) =>
              setProdSelected({
                ...prodSelected,
                name: event.target.value,
              })
            }
            className="form-control"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            value={prodSelected.price ?? 0.0}
            required
            onChange={(event) =>
              setProdSelected({
                ...prodSelected,
                price: parseFloat(event.target.value),
              })
            }
            className="form-control"
            id="price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock count *</label>
          <input
            type="number"
            value={prodSelected.stock ?? 0}
            required
            onChange={(event) =>
              setProdSelected({
                ...prodSelected,
                stock: parseInt(event.target.value),
              })
            }
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
            value={prodSelected.type}
            onChange={(event) =>
              setProdSelected({
                ...prodSelected,
                type: event.target.value ?? "",
              })
            }
          >
            <option value="">Product</option>
            <option value="dish">Dish</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          disabled={
            !prodSelected.name || !prodSelected.price || !prodSelected.id
          }
          className="btn btn-primary"
        >
          <FiEdit size={18} className="mr-2 mb-1" />
          Update
        </button>
      </Modal.Footer>
    </form>
  );
};

export default UpdateProduct;
