import { login } from '../../api/auth/auth.js'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const nav = useNavigate()
    const {login : setLoggedIn} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(username, password)
            setLoggedIn()
            nav('/home')
            console.log('niceeeeee')
        } catch {
            setError('Invalid Credentials')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='login-wrapper'>
                <div className='login-header'>
                    <h1>Welcome Back</h1>
                </div>
                <div className='login-card'>
                    <div className='form-group'>
                        
                        <input 
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'/>
                    </div>
                    <button type='submit' className='login-btn'>Login</button>
                </div>
            </div>
        </form>
    )
}

export default Login