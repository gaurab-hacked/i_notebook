import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DarkmodeContext from '../context/DarkmodeContext';

const Aboutus = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'I-NoteBook AboutUs'
        if (!localStorage.getItem('auth-token')) {
            navigate("/register")
        }// eslint-disable-next-line
    }, [])
    const {mode} = useContext(DarkmodeContext);

    return (
        <div style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", height:"100vh"}:{}}>
            <h1 className='text-center py-5'>This page is on the progress</h1>
        </div>
    )
}

export default Aboutus