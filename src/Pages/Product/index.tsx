import React, { useState } from "react";

import "./Products.scss";
import { FiPlus, FiEdit, FiTrash2, FiShoppingBag } from "react-icons/fi";
import Create from "./Create";
import Modal from "react-bootstrap/Modal";
import { useForms } from "../../Contexts/Forms";
import { useApi } from "../../Contexts/Api";
import { IProduct } from "./models";
import Loading from "../../Components/Loading";

const Products: React.FC = () => {
  const { setProdSelected, prodSelected } = useForms();
  const { Api, useAxios } = useApi();
  const [createModalShow, setCreateModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [stockModalShow, setStockModalShow] = useState(false);

  const { data, error } = useAxios<IProduct[]>("/product");

  if (error)
    alert("An error occurred when trying to reach the server:\n" + error);

  if (!data) return <Loading />;

  async function delProduct() {
    const answer = window.confirm(
      "Do you really want to delete " +
        prodSelected.name +
        " from the database?"
    );
    if (answer) {
      try {
        if (prodSelected.id) {
          const response = await Api.delete(`/product?id=${prodSelected.id}`);
          alert(response.data.message);
          clear();
        } else throw new Error("Please select a product from the table below");
      } catch (e) {
        alert("An error occurred when trying to reach the server:\n" + e);
      }
    }
  }

  async function handleStockSubmit() {
    try {
      const resp = await Api.put("/product", {
        id: prodSelected.id ? prodSelected.id.toString() : "0",
        stock: prodSelected.stock ? prodSelected.stock.toString() : "0",
      });
      alert(resp.data.message);
      clear("stock");
    } catch (error) {
      alert("An error occurred when trying to reach the server:\n" + error);
    }
  }

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
      clear("update");
    } catch (error) {
      alert("An error occurred when trying to reach the server: \n" + error);
    }
  }

  function clear(modal: string = "") {
    setProdSelected({} as IProduct);
    if (modal.trim() !== "") {
      if (modal === "update") setUpdateModalShow(false);
      if (modal === "stock") setStockModalShow(false);
    }
  }

  return (
    <>
      {/* modals */}
      <Modal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Create
            onClose={() => {
              setCreateModalShow(false);
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={updateModalShow}
        onHide={() => {
          setUpdateModalShow(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        {/* UpdateForm */}
        <form
          onSubmit={handleUpdateSubmit}
          className="container px-4 rounded-lg"
        >
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
      </Modal>

      <Modal
        show={stockModalShow}
        onHide={() => {
          setStockModalShow(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Stock Product</Modal.Title>
        </Modal.Header>
        {/* Stock form */}
        <form
          onSubmit={handleStockSubmit}
          className="container px-4 rounded-lg"
        >
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
      </Modal>

      <h3 className="mb-2">Product</h3>
      <header className="container mb-0 position-sticky bg-white py-3">
        <ul className="row m-0 px-auto">
          <li className="col col-md-2">
            <button
              className="btn shadow-sm btn-success"
              onClick={() => setCreateModalShow(true)}
            >
              <FiPlus size={18} className="mb-1 mr-2" />
              Create
            </button>
          </li>
          <li className="col col-md-2">
            <button
              className="btn shadow-sm btn-warning"
              onClick={() => {
                setUpdateModalShow(true);
              }}
            >
              <FiEdit size={18} className="mb-1 mr-2" />
              Update
            </button>
          </li>
          <li className="col col-md-2">
            <button
              className="btn shadow-sm btn-danger"
              disabled={!prodSelected.id}
              onClick={delProduct}
            >
              <FiTrash2 size={18} className="mb-1 mr-2" />
              Delete
            </button>
          </li>
          <li className="col col-md-2">
            <button
              className="btn shadow-sm btn-info"
              onClick={() => {
                setStockModalShow(true);
              }}
            >
              <FiShoppingBag size={18} className="mb-1 mr-2" />
              Stock
            </button>
          </li>
        </ul>
      </header>
      <table className="table table-hover">
        <caption>List of products</caption>
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col" colSpan={2}>
              Name
            </th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Dish</th>
          </tr>
        </thead>
        <tbody className="table-products">
          {data?.map((product: IProduct) => (
            <tr
              className={`${
                prodSelected.id === product.id ? "bg-secondary text-white" : ""
              }`}
              onClick={() => setProdSelected(product)}
              key={product.id}
            >
              <th scope="row">{product.id}</th>
              <td colSpan={2}>{product.name}</td>
              <td colSpan={product.type === "" ? 1 : 2}>{product.price}</td>
              <td className={`${product.type === "" ? "" : "d-none"}`}>
                {product.stock}
              </td>
              <td>{product.type === "" ? "" : "Yes"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Products;
