import { Account } from '@/interfaces/account'
import { ReactNode } from 'react'

export interface AppState {
  account?: Account
}
export interface Action {
  type: 'ADD_ACCOUNT'
  payload: Account
}

export type GlobalProviderProps = {
  children: ReactNode
}
