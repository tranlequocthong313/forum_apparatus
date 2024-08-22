import React, { createContext } from "react";


export const AuthContext = createContext({
	isAuthModalOpen: false,
	handleOpenAuthModal: () => { },
	handleCloseAuthModal: () => { },
})
