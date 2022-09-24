import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/NoteContext';
import Cards from './Cards';


const NoteForm = () => {
    const { postNote, allNote, getALlNote} = useContext(NoteContext); //allNote
    const [inpValue, setInpValue] = useState({ title: "", discription: "", category: "" });

    const inpFldChange = (e) => {
        setInpValue({ ...inpValue, [e.target.name]: e.target.value })
    }

    const addBtnClk = (e) => {
        e.preventDefault();
        if (inpValue.title.length >= 5 && inpValue.discription.length >= 10 && inpValue.category.length >= 4) {
            totalNote.push(inpValue)
            setInpValue({ title: "", discription: "", category: "" });
            postNote(inpValue, 'http://localhost:4000/api/note/uploadNote');
        }
    }

    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            getALlNote();
        }// eslint-disable-next-line
    }, [addBtnClk])

    let totalNote = allNote;


    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" name='title' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={inpValue.title} onChange={inpFldChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Discription</label>
                    <input type="text" name='discription' className="form-control" id="exampleInputPassword1" value={inpValue.discription} onChange={inpFldChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Category:</label>
                    <input type="text" name='category' className="form-control" id="exampleInputPassword1" value={inpValue.category} onChange={inpFldChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={addBtnClk}>Add Note</button>
            </form>
            <hr />
            <h3 style={{ textDecoration: "underline", margin: "10px 20px" }}>Your Notes:</h3>
            <Cards cardDetail={totalNote} />
        </>
    )
}

export default NoteForm;