import api from '../axiosInstance'

export const authenticate = async () => {
    return await api.get('accounts/auth/')
}
export const login = async (username, password) => {
    return await api.post('accounts/token/', {username, password})
}
export const logout = async () => {
    return await api.post('accounts/logout/')
}

export const register = async (data) => {
    return await api.post('accounts/reigister/', data)
}
    


