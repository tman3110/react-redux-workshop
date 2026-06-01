import { createContext, useContext } from 'react'

export type Currency = 'USD' | 'VND'
export type Theme = 'light' | 'dark'

export type AppContextValue = {
  currency: Currency
  setCurrency: (currency: Currency) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  currencySymbol: string
  total: number
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useAppContext(): AppContextValue {
  const value = useContext(AppContext)
  if (!value) {
    throw new Error('useAppContext must be used within <AppContext.Provider>')
  }
  return value
}
