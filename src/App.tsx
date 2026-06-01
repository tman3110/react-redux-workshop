import { useState } from 'react'
import { AppProvider } from './context/AppProvider'
import { useAppContext } from './context/AppContext'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchBar from './components/SearchBar'
import AppHeader from './components/AppHeader'
import './App.css'

function App() {
  return (
    <AppProvider>
      <AppBody />
    </AppProvider>
  )
}

function AppBody() {
  const [query, setQuery] = useState('')
  const { theme } = useAppContext()

  return (
    <div className="app-layout" data-theme={theme}>
      <aside>
        <h1>Expense Manager</h1>
        <AppHeader />
        <ExpenseForm />
      </aside>
      <main>
        <SearchBar query={query} onQueryChange={setQuery} />
        <ExpenseList query={query} />
      </main>
    </div>
  )
}

export default App
