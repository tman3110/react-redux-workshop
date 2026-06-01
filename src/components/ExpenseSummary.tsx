import { useAppContext } from '../context/AppContext'

function ExpenseSummary() {
  const { total, currencySymbol } = useAppContext()
  return (
    <div className="expense-summary">
      <span className="expense-summary-label">Total</span>
      <span className="expense-summary-amount">{currencySymbol}{total.toFixed(2)}</span>
    </div>
  )
}

export default ExpenseSummary
