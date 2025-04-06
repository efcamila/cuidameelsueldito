"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Table from "@/app/components/Table"
import AddIncome from "@/app/components/addIncome/AddIncome"
import BudgetMont from "@/app/components/budgetMont/BudgetMont"
import { BudgetProvider } from "@/context/BudgetContext"
import Needs from "./components/needs/Needs"
import Wants from "./components/wants/Wants"
import Saves from "./components/saves/Saves"

export default function Home() {
  interface Budget {
    cash: string
    digitalMoney: string
  }
  
  const [budget, setBudget] = useState<Budget>({ cash: "0", digitalMoney: "0" })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getBudget")
        setBudget(response.data.result)
      } catch (err) {
        console.error("Algo salió mal", err)
      }
    } 
    fetchData()
  }, [])



  return (
    <div className="bg-slate-300 flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)] w-full">
      <BudgetProvider budget={budget} setBudget={setBudget}>
        <AddIncome />
        <BudgetMont/>
        <Needs/>
        <Wants/>
        <Saves/>
      </BudgetProvider>
    </div>
  )
}
