import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { logout  } from "../../api/auth/auth";
import './NavBar.css'

const NavBar = () => {
    const { logout : setLoggedOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setLoggedOut()
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">UniPath</div>
            
            <NavLink to='/home' className="navbar-link">Home</NavLink>
            <NavLink to='/create' className="navbar-link">+</NavLink>
            
            <div className="">
                <button className="navbar-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBar