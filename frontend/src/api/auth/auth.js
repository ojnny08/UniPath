import api from './axiosInstance'

const authenticate = () => {
    api.get('/accounts/auth/')
}
const login = (username, password) => (
    api.post('/accounts/token/', {username, password})
)
const logout = () => (
    api.post('/accounts/logout/')
)
const register = (data) => (
    api.post('/accounts/reigister/', data)
)

export default {authenticate, login, logout, register}