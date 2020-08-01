import React, { useState } from "react";

import { FiPlus, FiEdit, FiTrash2, FiShoppingBag } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { mutate } from "swr";

import "./Products.scss";
import { useForms } from "../../Contexts/Forms";
import { useApi } from "../../Contexts/Api";
import { IProduct } from "./models";

import Loading from "../../Components/Loading";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import StockProduct from "./StockProduct";

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
          mutate("/product");
        } else throw new Error("Please select a product from the table below");
      } catch (e) {
        alert("An error occurred when trying to reach the server:\n" + e);
      }
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
          <CreateProduct
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
        <UpdateProduct onClear={(modal) => clear(modal)} />
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
        <StockProduct onClear={(modal) => clear(modal)} />
      </Modal>

      <h3 className="mb-2">Product</h3>
      <header className="container mb-0 px-0 bg-white py-3">
        <ul className="d-flex p-0">
          <li className="mr-4">
            <button
              className="btn shadow-sm btn-success"
              onClick={() => setCreateModalShow(true)}
            >
              <FiPlus size={18} className="mb-1 mr-2" />
              Create
            </button>
          </li>
          <li className="mr-4">
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
          <li className="mr-4">
            <button
              className="btn shadow-sm btn-danger"
              disabled={!prodSelected.id}
              onClick={delProduct}
            >
              <FiTrash2 size={18} className="mb-1 mr-2" />
              Delete
            </button>
          </li>
          <li className="mr-4">
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
          {data?.map((p: IProduct) => (
            <tr
              className={`${
                prodSelected.id === p.id ? "bg-secondary text-white" : ""
              }`}
              onClick={() => setProdSelected(p)}
              key={p.id}
            >
              <th scope="row">{p.id}</th>
              <td
                colSpan={2}
                className={`${
                  p.stock <= 0 && p.type.trim() === "" ? "text-danger" : null
                }`}
              >
                {p.name}
              </td>
              <td colSpan={p.type === "" ? 1 : 2}>{p.price}</td>
              <td
                className={`${p.stock <= 0 ? "text-danger" : null} ${
                  p.type.trim() === "" ? null : "d-none"
                }`}
              >
                {p.stock}
              </td>
              <td>{p.type === "" ? "" : "Yes"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Products;
