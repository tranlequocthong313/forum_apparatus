import { createContext } from 'react'
import { UserState, UserAction } from '../types'

export const UserContext = createContext<UserState | undefined>(undefined)
export const UserDispatchContext = createContext<React.Dispatch<UserAction> | undefined>(undefined)
