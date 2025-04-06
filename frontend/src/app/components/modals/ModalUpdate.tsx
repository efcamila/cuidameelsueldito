import axios from "axios"
import React, { useEffect, useState } from "react"
import Modal from "../modal/Modal"

interface Needs {
  id: string
  name: string
  estimated: string
  current: string
  category_id: number
}

interface ModalProps {
  remaining: number
  onClose: () => void
  item: Needs | undefined
}

const ModalUpdate = ({ remaining, onClose, item }: ModalProps) => {
  const [name, setName] = useState("")
  const [estimated, setEstimated] = useState(0)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (item) {
      setName(item.name)
      setEstimated(parseFloat(item.estimated))
      setCurrent(parseFloat(item.current))
    }
  }, [item])

  const onSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (estimated > remaining) {
      return alert(`Te excedes del total para asignar: ${remaining}`)
    }

    const data = {
      name,
      estimated,
      current
    }

    try {
      if (!item) {
        return alert("No se ha encontrado el ítem a actualizar")
      }

      await axios.put(
        `http://localhost:8000/api/updateBudgetItem/${item.id}`,
        data
      )
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
      <Modal.Header onClose={onClose}>
        <Modal.Title>Actualiza una necesidad</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <form className="flex flex-col gap-3" onSubmit={onSubmitUpdate}>
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

export default ModalUpdate
