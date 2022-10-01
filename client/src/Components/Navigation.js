import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import SearchContext from '../context/SearchContext';
import UserContext from '../context/UserContext';
import './css/Navigation.css'

const Navigation = () => {
    const { searchVal, setSearchVal, cardhide, setCardhide } = useContext(SearchContext);
    const { allNote } = useContext(NoteContext);
    const { setUserData, userData } = useContext(UserContext)
    const path = useLocation().pathname;
    const navigate = useNavigate();

    const LogoutBtnClk = () => {
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
    const searchValChange = (e) => {
        setSearchVal(e.target.value);
    }

    let name = userData.name;
    return (
        <>{localStorage.getItem('auth-token') &&
            <nav id='navigation'>
                <div id="logo" > <Link to='/'>I- <span id='LogoN'>N</span> oteBook</Link></div>
                <ul className="navlinks flex">
                    <li><Link className={path === "/" ? "active" : ""} aria-current="page" to="/">Home</Link></li>
                    <li><Link className={path === "/allnotes" ? "active" : ""} aria-current="page" to="/allnotes">All Notes</Link></li>
                    <li><Link className={path === "/aboutus" ? "active" : ""} aria-current="page" to="/aboutus">About Us</Link></li>
                </ul>
                <div className="navRightSide flex">
                    <div id="search">
                        <input type="search" placeholder="Search" aria-label="Search" value={searchVal} onChange={searchValChange} />
                    </div>
                    {localStorage.getItem('auth-token') ? <div id='profile' onClick={profileclk}><i className="fa-solid fa-user"></i></div> :
                        <>
                            <Link aria-current="page" to="/login">
                                <button className='button'>
                                    LogIn
                                </button>
                            </Link>
                            <Link aria-current="page" to="/register">
                                <button className='checkedbutton'>
                                    Register
                                </button>
                            </Link>
                        </>
                    }

                    <div id='card' className={cardhide ? `cardHide` : `cardShow`} >
                        <h5>Hello {name === undefined ? "Hello" : name[0].toUpperCase() + name.substring(1)}</h5>
                        <p>Thank you for using this website to save your note</p>
                        <p className='totalNoteDis'> {allNote.length !== 0 ? `You Have Total ${allNote.length} ${allNote.length === 1 ? `Note` : `Notes`}` : `Please Save Your Note`}.</p>
                        <button className='btn btn-primary btn-sm mx-5' onClick={LogoutBtnClk}>Logout</button>
                    </div>
                </div>
            </ nav >
        }
        </>
    )
}

export default Navigation
