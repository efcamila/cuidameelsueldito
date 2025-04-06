import React, { useContext, useEffect } from "react";
import Table from "@/app/components/Table";
import Modal from "@/app/components/modal/Modal";
import { IoIosAddCircle } from "react-icons/io";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { BudgetContext } from "@/context/BudgetContext";

const AddIncome = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("BudgetContext no está disponible");
  }

  const { budget, setBudget } = context;

  const [cash, setCash] = useState<number>();
  const [digitalMoney, setDigitalMoney] = useState<number>();
  const [add, setAdd] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<
    "cash" | "digitalMoney" | null
  >(null);
  const [newValue, setNewValue] = useState("");
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<
    "cash" | "digitalMoney" | null
  >(null);

  const total = parseFloat(budget.cash) + parseFloat(budget.digitalMoney);

  const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      cash,
      digitalMoney,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addIncome",
        data
      );
      window.location.href = "/";
    } catch (err) {
      console.error("Algo salió mal", err);
    }
  };

  const handleUpdate = async () => {
    if (!editingField) return;

    const data = {
      [editingField]: parseFloat(newValue),
    };

    try {
      console.log(data);
      await axios.put("http://localhost:8000/api/updateIncome", data);
      setBudget((prev) => ({ ...prev, [editingField]: newValue }));
      setModalOpen(false);
    } catch (err) {
      console.error("Error al actualizar el presupuesto", err);
    }
  };

  const openModal = (field: "cash" | "digitalMoney") => {
    setEditingField(field);
    setNewValue(budget[field]);
    setModalOpen(true);
  };

  const openDeleteModal = (field: "cash" | "digitalMoney") => {
    setFieldToDelete(field);
    setModalDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!fieldToDelete) return;

    const data = {
      [fieldToDelete]: 0,
    };

    try {
      await axios.put("http://localhost:8000/api/deleteIncome", data);
      setBudget((prev) => ({ ...prev, [fieldToDelete]: 0 }));
      setModalDeleteOpen(false);
    } catch (err) {
      console.error("Error al eliminar el presupuesto", err);
    }
  };

  return (
    <div className="w-3xl flex justify-between gap-5">
      <div className="bg-white w-2xl rounded-xl px-5 flex flex-col justify-evenly">
        <h1 className="text-3xl">$ {total ? total : "0"} </h1>
        <button
          onClick={() => setAdd(true)}
          className="bg-black text-white rounded-2xl px-5 py-3 text-sm"
        >
          Agregar ingreso
        </button>
      </div>
      <div className="">
        <Table>
          <Table.Head>
            <Table.Column>Tipo</Table.Column>
            <Table.Column>Monto</Table.Column>
            <Table.Column>Acciones</Table.Column>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Efectivo</Table.Cell>
              <Table.Cell>{budget.cash}</Table.Cell>
              <Table.Cell className="flex justify-evenly">
                <FaPencil onClick={() => openModal("cash")} />
                <FaTrashCan onClick={() => openDeleteModal("cash")} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Digital</Table.Cell>
              <Table.Cell>{budget?.digitalMoney}</Table.Cell>
              <Table.Cell className="flex justify-evenly">
                <FaPencil onClick={() => openModal("digitalMoney")} />
                <FaTrashCan onClick={() => openDeleteModal("digitalMoney")} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      {add && (
        <Modal size="sm">
          <Modal.Header onClose={() => setAdd(false)}>
            <Modal.Title>Agrega tu ingreso</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <form onSubmit={onSubmitChange} className="flex flex-col gap-3">
              <label htmlFor="cash">Efectivo</label>
              <input
                type="number"
                id="cash"
                name="cash"
                className="p-2 rounded-lg border border-black"
                value={cash}
                onChange={(e) => setCash(parseFloat(e.target.value))}
              />
              <label htmlFor="digitalMoney">Digital</label>
              <input
                type="number"
                id="digitalMoney"
                name="digitalMoney"
                className="p-2 rounded-lg border border-black"
                value={digitalMoney}
                onChange={(e) => setDigitalMoney(parseFloat(e.target.value))}
              />
              <Modal.Footer>
                <button
                  type="button"
                  onClick={() => setAdd(false)}
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
      )}

      {modalOpen && (
        <Modal size="sm">
          <Modal.Header onClose={() => setModalOpen(false)}>
            <Modal.Title>
              Editar {editingField === "cash" ? "Efectivo" : "Dinero Digital"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <label>
              {editingField === "cash" ? "Efectivo" : "Dinero Digital"}:
            </label>
            <input
              type="number"
              // id={editingField}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="p-2 rounded-lg border border-black"
            />
          </Modal.Content>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="primary-light"
            >
              Cerrar
            </button>
            <button onClick={handleUpdate} className="primary-button">
              Aceptar
            </button>
          </Modal.Footer>
        </Modal>
      )}
      {/* Modal de confirmación para eliminar */}
      {modalDeleteOpen && (
        <Modal size="sm">
          <Modal.Header onClose={() => setModalDeleteOpen(false)}>
            <Modal.Title>¿Estás seguro de eliminar?</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <p>Estás a punto de eliminar el campo {fieldToDelete}.</p>
          </Modal.Content>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setModalDeleteOpen(false)}
              className="primary-light"
            >
              Cancelar
            </button>
            <button onClick={handleDelete} className="primary-button">
              Eliminar
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AddIncome;
