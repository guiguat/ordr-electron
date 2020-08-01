import React, { useState } from "react";
import { useApi } from "../../Contexts/Api";
import { FiUserPlus, FiTrash2, FiEdit } from "react-icons/fi";
import CostumerOrders from "./CostumerOrders";
import { ICostumer } from "./models";
import Loading from "../../Components/Loading";
import Modal from "react-bootstrap/Modal";

import { mutate } from "swr";
import NewCostumer from "./NewCostumer";
import UpdateCostumer from "./UpdateCostumer";

const Costumer: React.FC = () => {
  const { Api, useAxios } = useApi();
  const [costumer, setCostumer] = useState<ICostumer>({} as ICostumer);
  const [showNewCostumer, setShowNewCostumer] = useState(false);
  const [showUpdateCostumer, setShowUpdateCostumer] = useState(false);

  const { data, error } = useAxios<ICostumer[]>("/costumer");

  if (error)
    alert("An error occurred when trying to reach the server:\n" + error);
  if (!data) return <Loading />;

  async function deleteCostumer(id: number) {
    let res = window.confirm("Are you sure? This will delete all his records");
    if (res) {
      try {
        const response = await Api.delete(`/costumer?id=${id}`);
        alert(response.data.message);
        mutate("/costumer");
      } catch (e) {
        alert("An error occurred when trying to reach the server:\n" + e);
      }
    }
  }

  return (
    <>
      <h3 className="mb-4">Costumer</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setShowNewCostumer(true);
        }}
      >
        <FiUserPlus /> Register New
      </button>

      <Modal
        show={showNewCostumer}
        centered
        onHide={() => {
          setShowNewCostumer(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Costumer</Modal.Title>
        </Modal.Header>
        <NewCostumer onClose={() => setShowNewCostumer(false)} />
      </Modal>

      <Modal
        show={showUpdateCostumer}
        onHide={() => {
          setShowUpdateCostumer(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update info</Modal.Title>
        </Modal.Header>
        <UpdateCostumer
          onClose={() => setShowUpdateCostumer(false)}
          costumer={costumer}
        />
      </Modal>

      <div className="container-fluid mt-3 p-0" id="costumers">
        {data?.map((c: ICostumer) => {
          return (
            <div
              key={c.id}
              className="container-fluid mx-auto mb-4 bg-light rounded-lg p-4"
            >
              <div className="row mb-3">
                <div className="col col-md-11">
                  <h4 className="m-0">{c.name}</h4>
                  <span className="text-secondary">
                    Document ID: {c.document}
                  </span>
                </div>
                <div className="col col-md-1">
                  <div className="row p-0">
                    <button
                      className="btn p-0 mr-1"
                      onClick={(e) => {
                        setCostumer(c);
                        setShowUpdateCostumer(true);
                      }}
                    >
                      <FiEdit className="text-warning" size={24} />
                    </button>
                    <button
                      className="btn p-0"
                      onClick={() => deleteCostumer(c.id)}
                    >
                      <FiTrash2 className="text-danger" size={24} />
                    </button>
                  </div>
                </div>
              </div>
              <CostumerOrders costumer_id={c.id} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Costumer;
