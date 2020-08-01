import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import { ICostumer, ICostumerForm } from "./models/index";
import { useApi } from "../../Contexts/Api";
import { FiEdit } from "react-icons/fi";

interface IUpdateCostumerForm extends ICostumerForm {
  costumer: ICostumer;
}

const UpdateCostumer: React.FC<IUpdateCostumerForm> = ({
  costumer,
  onClose,
}) => {
  const { Api } = useApi();

  const [name, setName] = useState(costumer.name);
  const [document, setDocument] = useState(costumer.document);

  async function updateCostumer(event: any) {
    event.preventDefault();
    try {
      if (costumer && costumer.id) {
        const data = {
          id: costumer.id,
          name,
          document,
        };
        const response = await Api.put("/costumer", data);
        alert(response.data.message);
        onClose();
      }
    } catch (e) {
      alert("An error occurred when trying to reach the server:\n" + e);
    }
  }

  return (
    <form onSubmit={updateCostumer}>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control form-control-sm"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="document">Document *</label>
          <input
            type="text"
            required
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            className="form-control form-control-sm"
            id="document"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          disabled={!name || !document}
          className="btn btn-warning w-100"
          type="submit"
        >
          <FiEdit className="mb-1 mr-2" /> Update
        </button>
      </Modal.Footer>
    </form>
  );
};

export default UpdateCostumer;
