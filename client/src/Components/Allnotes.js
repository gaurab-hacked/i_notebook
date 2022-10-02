import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DarkmodeContext from '../context/DarkmodeContext';
import NoteContext from '../context/NoteContext';
import Cards from './Cards';

const Allnotes = () => {

    const { allNote, getALlNote } = useContext(NoteContext); //allNote

    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'I-NoteBook AllNote'
        if (localStorage.getItem('auth-token')) {
            getALlNote();
        }
        else {
            navigate("/register")
        }
        // eslint-disable-next-line
    }, [])

    let totalNote = allNote;


    const {mode} = useContext(DarkmodeContext);

    return (
        <>
            {
                totalNote.length === 0 ? <h1 className='text-center my-5'>Please Enter Notes To See Here</h1> : <div className=' py-5' style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", height:"92vh"}:{}}>
                    <Cards cardDetail={totalNote} />
                </div>
            }

        </>
    )
}

export default Allnotes
