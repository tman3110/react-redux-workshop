import { useReducer } from 'react'
import { CATEGORIES } from '../constants'
import { formReducer, initialFormState } from '../reducers/formReducer'
import { useAppContext } from '../context/AppContext'

function ExpenseForm() {
  const { dispatchExpenses } = useAppContext()
  const [form, dispatch] = useReducer(formReducer, initialFormState)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.description || !form.amount || !form.category) return
    dispatchExpenses({
      type: 'ADD_EXPENSE',
      payload: {
        description: form.description,
        amount: parseFloat(form.amount),
        category: form.category,
        date: new Date().toISOString().split('T')[0],
      },
    })
    dispatch({ type: 'RESET' })
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <label>
        Name
        <input
          value={form.description}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
          placeholder="e.g. Lunch"
          required
        />
      </label>
      <label>
        Amount ($)
        <input
          value={form.amount}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'amount', value: e.target.value })}
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          required
        />
      </label>
      <label>
        Category
        <select value={form.category} onChange={e => dispatch({ type: 'SET_FIELD', field: 'category', value: e.target.value })} required>
          <option value="">Select category</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm
