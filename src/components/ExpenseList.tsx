import { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { filterExpenses } from '../utils/filterExpenses'
import ExpenseItem from './ExpenseItem'
import ExpenseSummary from './ExpenseSummary'

interface ExpenseListProps {
  query: string
}

function ExpenseList({ query }: ExpenseListProps) {
  const { expenses } = useAppContext()

  const filteredExpenses = useMemo(
    () => filterExpenses(expenses, query),
    [expenses, query],
  )

  const total = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses],
  )

  return (
    <div className="expense-list">
      <ExpenseSummary total={total} />
      <h2>Expenses</h2>
      {filteredExpenses.length === 0 ? (
        <p className="empty-state">No expenses yet.</p>
      ) : (
        <ul>
          {filteredExpenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList
