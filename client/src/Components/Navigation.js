import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import UserContext from '../context/UserContext';
import './css/Navigation.css'


const Navigation = () => {
    const { allNote } = useContext(NoteContext);
    const { setUserData, userData } = useContext(UserContext)
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const [cardhide, setCardhide] = useState(true);

    const LogoutBtnClk = () => {
        console.log("logged out");
        localStorage.removeItem("auth-token");
        navigate("/login");
        setUserData({});
        setCardhide(true)
    }

    const profileclk = () => {
        // setCardhide(true)
        if (cardhide === true) {
            setCardhide(false);
        } else {
            setCardhide(true);
        }
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
                            <Link className={path === "/allnotes" ? "nav-link mx-3 active" : "nav-link mx-3"} aria-current="page" to="/allnotes">All Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={path === "/ablutus" ? "nav-link mx-3 active" : "nav-link mx-3"} aria-current="page" to="/ablutus">About Us</Link>
                        </li>

                    </ul>

                    {localStorage.getItem('auth-token') ? <div id='profile' onClick={profileclk}><i className="fa-solid fa-user"></i></div> :
                        <>
                            <Link className={path === "/login" ? "nav-link active mx-1" : "nav-link mx-1"} aria-current="page" to="/login">
                                <button className='btn btn-primary btn-sm'>
                                    Login
                                </button>
                            </Link>
                            <Link className={path === "/register" ? "nav-link active mx-1" : "nav-link mx-1"} aria-current="page" to="/register">
                                <button className='btn btn-primary btn-sm mx-3'>
                                    Register
                                </button>
                            </Link>
                        </>
                    }

                    <div id='card' className={cardhide ? `cardHide` : `cardShow`}>
                        <h5>Hello {userData.name}</h5>
                        <p>Thank you for using this website to save your note</p>
                        <p className='totalNoteDis'> {allNote.length !== 0 ? `You Have Total ${allNote.length} ${allNote.length === 1 ? `Note` : `Notes`}` : `Please Save Your Note`}.</p>
                        <button className='btn btn-primary btn-sm mx-5' onClick={LogoutBtnClk}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;