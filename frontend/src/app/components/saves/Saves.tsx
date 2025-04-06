import React, { useContext, useEffect, useState } from "react"
import Table from "../Table"
import { BudgetContext } from "@/context/BudgetContext"
import { IoAddCircleOutline } from "react-icons/io5"
import axios from "axios"
import { FaPencil, FaTrash } from "react-icons/fa6"
import ModalCreate from "../modals/ModalCreate"
import ModalUpdate from "../modals/ModalUpdate"
import ModalDelete from "../modals/ModalDelete"

interface Needs {
  id: string
  name: string
  estimated: string
  current: string
  category_id: number
}

const Saves = () => {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error("BudgetContext no está disponible")
  }
  const { percentage20 } = context

  const [addModal, setAddModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [needs, setNeeds] = useState<Needs[]>([])
  const [total, setTotal] = useState(0)
  const [item, setItem] = useState<Needs | undefined>(undefined)

  useEffect(() => {
    const getNeeds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/budgetsItems/3"
        )
        setNeeds(response.data)
      } catch (error) {}
    }
    getNeeds()
  }, [])

  useEffect(() => {
    const total = needs.reduce((acc: number, need: Needs) => {
      const estimated = parseFloat(need.estimated) || 0
      return acc + estimated
    }, 0)
    setTotal(total)
  }, [needs])

  const remaining = percentage20 - total

  const handleFind = (id: string) => {
    const find = needs.find((need) => need.id === id)
    if (find) {
      setItem(find)
    }
  }

  return (
    <div className="w-3xl bg-white rounded-lg">
      <div className="flex justify-between pt-4 px-5">
        <h1 className="font-bold">Deseos</h1>
        <div className="flex items-center gap-5">
          <h2 className="font-light">Te quedan ${remaining} por asignar</h2>
          <IoAddCircleOutline size={30} onClick={() => setAddModal(true)} />
        </div>
      </div>
      <Table>
        <Table.Head>
          <Table.Column>Categoría</Table.Column>
          <Table.Column>Estimado</Table.Column>
          <Table.Column>Actual</Table.Column>
          <Table.Column>Acciones</Table.Column>
        </Table.Head>
        <Table.Body>
          {needs.map((need) => (
            <Table.Row key={need.id}>
              <>
                <Table.Cell>{need.name}</Table.Cell>
                <Table.Cell>{need.estimated}</Table.Cell>
                <Table.Cell>{need.current}</Table.Cell>
                <Table.Cell className="flex justify-evenly">
                  <FaPencil
                    onClick={() => {
                      setUpdateModal(true)
                      handleFind(need.id)
                    }}
                  />
                  <FaTrash
                    onClick={() => {
                      setDeleteModal(true)
                      handleFind(need.id)
                    }}
                  />
                </Table.Cell>
              </>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {addModal && (
        <ModalCreate
          remaining={remaining}
          category_id={2}
          onClose={() => setAddModal(false)}
        />
      )}
      {updateModal && (
        <ModalUpdate
          remaining={remaining}
          onClose={() => setUpdateModal(false)}
          item={item}
        />
      )}
      {deleteModal && item && (
        <ModalDelete onClose={() => setDeleteModal(false)} id={item.id} />
      )}
    </div>
  )
}

export default Saves
