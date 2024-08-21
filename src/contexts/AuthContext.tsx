import React, {createContext, useState} from "react";
import {User} from "../types/user";
import {useApi} from "../hooks/useApi";
import Api from "../services/Api";


interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    setAuth: (accessToken: string, user: User) => void;
    clearAuth: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    setAuth: () => {
    },
    clearAuth: () => {
    },
    loading: true
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const {execute: getCurrentUser} = useApi(Api.getCurrentUser)

    React.useEffect(() => {
        const initAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                try {
                    const userData = await getCurrentUser();
                    setIsAuthenticated(true);
                    setUser(userData.data);
                } catch (error) {
                    console.error('Failed to get current user:', error);
                    localStorage.removeItem('accessToken');
                }
            }
            setLoading(false);

        };
        initAuth();
    }, [getCurrentUser]);


    const setAuth = (accessToken: string, userData: User) => {
        localStorage.setItem('accessToken', accessToken);
        setIsAuthenticated(true);
        setUser(userData);
    };

    const clearAuth = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        // <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
        //     {children}
        // </AuthContext.Provider>
        <AuthContext.Provider value={{isAuthenticated, user, setAuth, clearAuth, loading}}>
            {children}
        </AuthContext.Provider>
    );

}

