import { memo } from 'react'
import { useAppContext } from '../context/AppContext'
import type { Expense } from '../types/expense'

interface ExpenseItemProps {
  expense: Expense
}

function ExpenseItem({ expense }: ExpenseItemProps) {
  const { dispatchExpenses, currencySymbol, theme } = useAppContext()

  return (
    <li className="expense-item">
      <span className={`expense-icon category-${expense.category}`}>
        {expense.category === 'Food' ? '\uD83C\uDF54' : expense.category === 'Transport' ? '\uD83D\uDE98' : expense.category === 'Housing' ? '\uD83C\uDFE0' : '\uD83D\uDCCB'}
      </span>
      <span className="expense-description">{expense.description}</span>
      <span className="expense-amount">{currencySymbol}{expense.amount.toFixed(2)}</span>
      <span className="expense-category">{expense.category}</span>
      <span className="expense-date">{expense.date}</span>
      <span className="theme-badge" title={`Theme: ${theme}`}>
        {theme === 'light' ? '\u2600\uFE0F' : '\uD83C\uDF19'}
      </span>
      <button
        className="delete-btn"
        onClick={() => dispatchExpenses({ type: 'DELETE_EXPENSE', payload: expense.id })}
        aria-label="Delete expense"
      >
        {'\u2715'}
      </button>
    </li>
  )
}

export default memo(ExpenseItem)
