import { Action, AppState } from '@/context/domain'

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return { ...state, account: action.payload }
    default:
      return state
  }
}
