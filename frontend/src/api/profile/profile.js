
import api from './axiosInstance'

const profile = () => (
    api.get('/accounts/profile/')
)
const updateProfile = (data) => (
    api.put('/accounts/profile/', data)
)