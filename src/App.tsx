import { useState, useEffect, useRef } from 'react'
import type { Expense } from './types/expense'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import './App.css'
import { STORAGE_KEY } from './constants'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    console.log('Loaded expenses from localStorage:', raw)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
})


  // TODO: save expenses to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    console.log('Saved expenses to localStorage:', expenses)
  }, [expenses]);
  
  function handleAddExpense(expense: Omit<Expense, 'id'>) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  function handleDeleteExpense(id: string) {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </aside>
      <main>
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App
