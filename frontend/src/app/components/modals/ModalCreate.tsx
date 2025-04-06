import axios from "axios"
import React from "react"
import { useState } from "react"
import Modal from "../modal/Modal"

interface ModalProps {
    remaining: number
    category_id: number
    onClose: () => void 
  }

const ModalCreate = ({ remaining, category_id, onClose }:ModalProps) => {
  const [name, setName] = useState("")
  const [estimated, setEstimated] = useState(0)
  const [current, setCurrent] = useState(0)

  const onSubmitChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (estimated > remaining) {
      return alert(`Te excedes del total para asignar: ${remaining}`)
    }

    const data = {
      name,
      estimated,
      current,
      category_id: category_id,
    }

    try {
      await axios.post("http://localhost:8000/api/insertBudgetItem", data)
      window.location.href = "/"
      setName("")
      setEstimated(0)
      setCurrent(0)
    } catch (error) {
      console.error("Algo salio mal", error)
    }
  }

  return (
          <Modal size="sm">
            <Modal.Header onClose={() => onClose}>
              <Modal.Title>Agrega una necesidad</Modal.Title>
            </Modal.Header>
            <Modal.Content>
              <form className="flex flex-col gap-3" onSubmit={onSubmitChange}>
                <label htmlFor="name">Nombre de la Categoria</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="p-2 rounded-lg border border-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
  
                <label htmlFor="estimated">Estimado</label>
                <input
                  type="number"
                  id="estimated"
                  name="estimated"
                  className="p-2 rounded-lg border border-black"
                  value={estimated}
                  onChange={(e) => setEstimated(parseFloat(e.target.value))}
                />
  
                <label htmlFor="current">Actual (opcional)</label>
                <input
                  type="number"
                  id="current"
                  name="current"
                  className="p-2 rounded-lg border border-black"
                  value={current}
                  onChange={(e) => setCurrent(parseFloat(e.target.value))}
                />
  
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

  )
}

export default ModalCreate
