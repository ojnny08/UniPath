import Navbar from '../NavBar/NavBar'
import SearchPost from '../Post/SearchPost/SearchPost'
import { Outlet } from 'react-router-dom'
import './Layout.css'

const Layout = () => {
    return (
        <div className='layout-container'>
            <Navbar />
            <div className='layout-main'>
                <header className='layout-top'>
                    <SearchPost />
                </header>
                <main className="layout-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout