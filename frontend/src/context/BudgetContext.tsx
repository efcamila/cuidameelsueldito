import React, { ReactNode, useMemo } from 'react'
import { createContext } from 'react'

interface Budget {
    cash: string
    digitalMoney: string
}

interface BudgetContextType {
    budget: Budget
    setBudget: React.Dispatch<React.SetStateAction<Budget>>
    percentage50: number
    percentage30: number
    percentage20: number
  }
  
interface BudgetProviderProps {
    budget: Budget
    setBudget: React.Dispatch<React.SetStateAction<Budget>>
    children: ReactNode
  }


const BudgetContext = createContext<BudgetContextType|undefined>(undefined)

const BudgetProvider = ({ budget, setBudget, children }: BudgetProviderProps) => {
  const percentage50 = useMemo(() => {
    const result = (parseFloat(budget.cash) + parseFloat(budget.digitalMoney)) * 0.5
    return Number(result.toFixed(2))
  }, [budget])

  const percentage30 = useMemo(() => {
    const result = (parseFloat(budget.cash) + parseFloat(budget.digitalMoney)) * 0.3
    return Number(result.toFixed(2))
  }, [budget])

  const percentage20 = useMemo(() => {
    const result = (parseFloat(budget.cash) + parseFloat(budget.digitalMoney)) * 0.2
    return Number(result.toFixed(2))
  }, [budget])
  return (
    <BudgetContext.Provider value={{ budget, setBudget, percentage50, percentage30, percentage20}}>
      {children}
    </BudgetContext.Provider>
  )
    
}

export {BudgetProvider,BudgetContext}