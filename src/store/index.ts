import { createStore, compose, type Reducer } from 'redux'
import { expensesReducer } from './expenses/reducer'
import type { ExpensesState } from './expenses/reducer'
import { STORAGE_KEY } from '../constants'
import type { ExpenseAction } from './expenses/actions'
import { filtersReducer } from './filters/reducer'
import type { FiltersState } from './filters/reducer'
import type { FiltersAction } from './filters/actions'

type RootAction = ExpenseAction | FiltersAction

const rootReducer: Reducer<RootState, RootAction> = (
  state = { expenses: { items: [], editingExpenseId: null }, filters: { category: null } },
  action,
) => ({
  expenses: expensesReducer(state.expenses, action as ExpenseAction),
  filters: filtersReducer(state.filters, action as FiltersAction),
})

export interface RootState {
  expenses: ExpensesState
  filters: FiltersState
}

function loadState(): RootState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const expenses = saved ? { items: JSON.parse(saved) as never[], editingExpenseId: null } : { items: [], editingExpenseId: null }
    return { expenses, filters: { category: null } }
  } catch {
    return { expenses: { items: [], editingExpenseId: null }, filters: { category: null } }
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' && (window as { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose }).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(rootReducer, loadState(), composeEnhancers())

store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().expenses.items))
})

export type AppDispatch = typeof store.dispatch
