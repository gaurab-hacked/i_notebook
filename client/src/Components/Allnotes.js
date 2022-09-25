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
        }
        else {
            navigate("/register")
        }
        // eslint-disable-next-line
    }, [])

    let totalNote = allNote;



    return (
        <>
            {
                totalNote.length === 0 ? <h1 className='text-center my-5'>Please Enter Notes To See Here</h1> : <div className='container my-5'>
                    <Cards cardDetail={totalNote} />
                </div>
            }

        </>
    )
}

export default Allnotes
