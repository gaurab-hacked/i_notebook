import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Aboutus = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'I-NoteBook AboutUs'
        if (!localStorage.getItem('auth-token')) {
            navigate("/register")
        }// eslint-disable-next-line
    }, [])

    return (
        <>
            <h1 className='text-center my-5'>This page is on the progress</h1>
        </>
    )
}

export default Aboutus