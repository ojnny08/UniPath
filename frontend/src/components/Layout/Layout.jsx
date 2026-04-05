// Layout.jsx
import Navbar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import './Layout.css'

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <div className="layout-content">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout