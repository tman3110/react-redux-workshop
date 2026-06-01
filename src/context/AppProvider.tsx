import { useEffect, useReducer, useState, type ReactNode } from 'react'
import type { Expense } from '../types/expense'
import { STORAGE_KEY } from '../constants'
import { expensesReducer } from '../reducers/expensesReducer'
import { AppContext } from './AppContext'

export function AppProvider({ children }: { children: ReactNode }) {
  const [expenses, dispatchExpenses] = useReducer(
    expensesReducer,
    null,
    () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as Expense[]) : []
    },
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const [currency, setCurrency] = useState<'USD' | 'VND'>('USD')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const currencySymbol = currency === 'USD' ? '$' : '₫'

  return (
    <AppContext.Provider
      value={{
        expenses,
        dispatchExpenses,
        currency,
        setCurrency,
        theme,
        setTheme,
        currencySymbol,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
