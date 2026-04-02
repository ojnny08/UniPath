import './Home.css'
import { logout } from '../../api/auth/auth'

const Home = () => {
    return (
        <div >
            <h1>Hi 👋</h1>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Home