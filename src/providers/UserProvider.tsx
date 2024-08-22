import React, { useReducer, ReactNode, useEffect } from 'react'
import { UserContext, UserDispatchContext } from '../contexts/UserContext'
import userReducer, { initialUserState } from '../reducers/userReducer'
import { load } from 'react-cookies'
import { authAPIs, authApis } from '../configs/api'
import { useAuth } from '../hooks/useAuth'

interface UserProviderProps {
	children: ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, dispatch] = useReducer(userReducer, initialUserState)

	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const res = await (await authAPIs()).get(authApis.current)
				dispatch({ type: 'CURRENT', payload: res.data })
			} catch (error) {
				console.error(error)
			}
		}

		const token = load('access-token')
		if (token) {
			getCurrentUser()
		}
	}, [])

	return (
		<UserContext.Provider value={user}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserContext.Provider>
	)
}

export default UserProvider
