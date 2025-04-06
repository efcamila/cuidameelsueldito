import React from "react";
import Modal from "../modal/Modal";
import axios from "axios";

interface ModalProps {
    onClose: () => void;
    id:string | undefined;
  }

const ModalDelete = ({onClose,id}:ModalProps) => {

    const onSubmitDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await axios.delete(
            `http://localhost:8000/api/deleteBudgetItem/${id}`
          );
          window.location.href = "/";
        } catch (error) {
          console.error("Algo salio mal", error);
        }
      };

  return (
    <Modal size="sm">
      <Modal.Header onClose={onClose}>
        <Modal.Title>Eliminar una necesidad</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <form className="flex flex-col gap-3" onSubmit={onSubmitDelete}>
          ¿Deseas borrar esta fila? Una vez eliminado no podras recuperarlo
          <Modal.Footer>
            <button
              type="button"
              onClick={onClose}
              className="primary-light"
            >
              Cerrar
            </button>
            <button type="submit" className="primary-button">
              Aceptar
            </button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDelete;
