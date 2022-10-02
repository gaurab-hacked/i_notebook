import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DarkmodeContext from '../context/DarkmodeContext';
import NoteContext from '../context/NoteContext';
import SearchContext from '../context/SearchContext';
import UserContext from '../context/UserContext';
import './css/Navigation.css'

const Navigation = () => {
    const {mode, toggleMode} = useContext(DarkmodeContext);
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
            <nav id='navigation' style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", boxShadow: "0 0 5px 0 rgb(255, 255, 255, .6)"}:{}}>
                <div id="logo" > <Link to='/' style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white"}:{}}>I- <span id='LogoN'>N</span> oteBook</Link></div>
                <ul className="navlinks flex">
                    <li><Link className={path === "/" ? "active" : ""} style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", borderBottomColor:"rgb(255, 255, 255, .6)"}:{}} aria-current="page" to="/">Home</Link></li>
                    <li><Link className={path === "/allnotes" ? "active" : ""} style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", borderBottomColor:"rgb(255, 255, 255, .6)"}:{}} aria-current="page" to="/allnotes">All Notes</Link></li>
                    <li><Link className={path === "/aboutus" ? "active" : ""} style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", borderBottomColor:"rgb(255, 255, 255, .6)"}:{}} aria-current="page" to="/aboutus">About Us</Link></li>
                </ul>
                <div className="navRightSide flex">
                    <div id="search" >
                        <input type="search" placeholder="Search" aria-label="Search" value={searchVal} onChange={searchValChange} style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", boxShadow:" inset 0 0 3px 0 rgb(255, 255, 255, .6)"}:{}} />
                    </div>

                    <div className="form-check form-switch" onClick={()=>toggleMode()} >
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" style={{cursor:"pointer"}}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{cursor:"pointer"}}>{mode==="dark"?"Light":"Dark"}</label>
                    </div>

                    <div id='profile' onClick={profileclk} style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", boxShadow:" inset 0 0 3px 0 rgb(255, 255, 255, .6)"}:{}}><i className="fa-solid fa-user"></i></div>
                    <div id='card' className={cardhide ? `cardHide` : `cardShow`} style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", boxShadow:" inset 0 0 3px 0 rgb(255, 255, 255, .6)"}:{}}>
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
