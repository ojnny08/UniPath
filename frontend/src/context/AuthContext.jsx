import { createContext, useState, useEffect, useContext, Children } from "react";
import authenticate from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await authenticate()
                setIsAuthenticated(true)
            } catch {
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    const login = () => setIsAuthenticated(true)
    const logout = () => setIsAuthenticated(false)

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)