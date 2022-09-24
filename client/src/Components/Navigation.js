import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';


const Navigation = () => {
    const { setUserData } = useContext(UserContext)
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const LogoutBtnClk = () => {
        console.log("logged out");
        localStorage.removeItem("auth-token");
        navigate("/login");
        setUserData({});
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand mx-5" to="/">I-Note</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={path === "/" ? "nav-link mx-3 active" : "nav-link mx-3"} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={path === "/login" ? "nav-link mx-3 active" : "nav-link mx-3"} aria-current="page" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={path === "/register" ? "nav-link mx-3 active" : "nav-link mx-3"} aria-current="page" to="/register">Register</Link>
                        </li>
                    </ul>
                    <button className='btn btn-primary btn-sm mx-5' onClick={LogoutBtnClk}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;