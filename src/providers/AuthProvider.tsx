import React, { useReducer, ReactNode, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { load } from 'react-cookies'
import { authAPIs, authApis } from '../configs/api'

interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

	const handleOpenAuthModal = () => {
		setIsAuthModalOpen(true)
	}

	const handleCloseAuthModal = () => {
		setIsAuthModalOpen(false)
	}

	return (
		<AuthContext.Provider value={{ isAuthModalOpen, handleOpenAuthModal, handleCloseAuthModal }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
