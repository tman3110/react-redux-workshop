import { useState, useEffect, useRef } from 'react'
// TODO: import useRef
import type { Expense } from './types/expense'
import { STORAGE_KEY } from './constants'
import { filterExpenses } from './utils/filterExpenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Expense[]) : []
  })

  const [query, setQuery] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      setFilteredExpenses(filterExpenses(expenses, query))
    }, 300)
    
    // Cleanup function to clear the timer if the component unmounts or before the next effect runs
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }

  }, [query, expenses])

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
        <SearchBar query={query} onQueryChange={setQuery} />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App
