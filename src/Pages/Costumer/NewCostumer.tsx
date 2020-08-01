import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import { ICostumerForm } from "./models/index";
import { useApi } from "../../Contexts/Api";
import { FiUserPlus } from "react-icons/fi";

const NewCostumer: React.FC<ICostumerForm> = ({ onClose }) => {
  const { Api } = useApi();

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");

  async function createNewCostumer(event: any) {
    event.preventDefault();
    try {
      const data = {
        name,
        document,
      };
      const response = await Api.post("/costumer", data);
      alert(response.data.message);
      onClose();
    } catch (e) {
      alert("An error occurred when trying to reach the server:\n" + e);
    }
  }

  return (
    <form onSubmit={createNewCostumer}>
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
          className="btn btn-primary w-100"
          disabled={!name || !document}
          type="submit"
        >
          <FiUserPlus className="mb-1 mr-2" /> Create
        </button>
      </Modal.Footer>
    </form>
  );
};

export default NewCostumer;
