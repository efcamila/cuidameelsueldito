import React, { useContext } from "react";
import Table from "../Table";
import { BudgetContext } from "@/context/BudgetContext";

const BudgetMont = () => {

    const context = useContext(BudgetContext)
    if (!context) {
        throw new Error('BudgetContext no está disponible');
      }
    
      const {percentage50,percentage30,percentage20} = context
      

  return (
    <div className="w-3xl bg-white rounded-lg">
      <h1 className="font-bold px-5 pt-3">Tu presupuesto mensual</h1>
      <Table>
        <Table.Head>
          <Table.Column>Necesidades (50%)</Table.Column>
          <Table.Column>Deseos (50%)</Table.Column>
          <Table.Column>Ahorros (50%)</Table.Column>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{percentage50}</Table.Cell>
            <Table.Cell>{percentage30}</Table.Cell>
            <Table.Cell>{percentage20}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default BudgetMont;
