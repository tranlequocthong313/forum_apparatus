import React, {createContext} from "react";


interface AuthContextType {
    isAuthenticated: boolean;
    user: any | null;
    login: (user: any) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {
    },
    logout: () => {
    }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<any | null>(null);

    React.useEffect(() => {
        // const token = localStorage.getItem('accessToken');
        const initAuth = async () => {
            try {
                // const userData = await refreshToken();
                // if (userData) {
                //     setIsAuthenticated(true);
                //     setUser(userData);
                // }
            } catch (error) {
                console.error('Failed to refresh token:', error);
            }
        };

        // initAuth();
    }, []);


    const login = (userData: any) => {
            setIsAuthenticated(true);
            setUser(userData);
        }

        const logout = () => {
            setIsAuthenticated(false);
            setUser(null);
        };

        return (
            <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
                {children}
            </AuthContext.Provider>
        );

    }

