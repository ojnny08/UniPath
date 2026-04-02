import { createContext, useState, useEffect, useContext } from "react";
import { authenticate } from '../api/auth/auth.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
            try {
                const res = await authenticate();
                setIsAuthenticated(res)
            } catch {
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }

    const login = () => setIsAuthenticated(true)
    const logout = () => setIsAuthenticated(false)
    
    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)