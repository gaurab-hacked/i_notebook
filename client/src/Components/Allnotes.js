import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import Cards from './Cards';

const Allnotes = () => {

    const { allNote, getALlNote } = useContext(NoteContext); //allNote

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getALlNote();
        }// eslint-disable-next-line
        else{
            navigate("/register")
        }
    }, [])

    let totalNote = allNote;



    return (
        <>
            <div className='container my-5'>
                <Cards cardDetail={totalNote} />
            </div>
        </>
    )
}

export default Allnotes
