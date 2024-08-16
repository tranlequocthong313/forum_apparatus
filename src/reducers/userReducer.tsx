import { UserAction, UserState } from '../types'
import { remove } from 'react-cookies'

export const initialUserState: UserState = {
  username: '',
  isLoggedIn: false,
  id: -1,
  fullName: '',
  email: '',
  phoneNumber: '',
  active: true,
  userRole: '',
  avatar: '',
  createdAt: -1,
  updatedAt: -1,
  note: null,
}

const userReducer = (state: UserState, action: UserAction): UserState => {
  console.group(action.type)
  console.log(action)
  console.groupEnd()
  switch (action.type) {
    case 'CURRENT':
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      }
    case 'LOGIN':
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      }
    case 'LOGOUT':
      remove('access-token')
      remove('user')
      return initialUserState
    default:
      return state
  }
}

export default userReducer
