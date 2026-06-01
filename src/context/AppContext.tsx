import { createContext, useContext, type Dispatch } from 'react'
import type { Expense } from '../types/expense'
import type { ExpenseAction } from '../reducers/expensesReducer'

export interface AppContextValue {
  expenses: Expense[]
  dispatchExpenses: Dispatch<ExpenseAction>
  currency: 'USD' | 'VND'
  setCurrency: (c: 'USD' | 'VND') => void
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
  currencySymbol: string
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useAppContext(): AppContextValue {
  const value = useContext(AppContext)
  if (!value) {
    throw new Error('useAppContext must be used within <AppProvider>')
  }
  return value
}
