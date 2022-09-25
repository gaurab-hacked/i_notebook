import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext';
import EachCards from './EachCards';


const Cards = (props) => {
    const ref = useRef(null)
    const { updateNotef,getALlNote  } = useContext(NoteContext);
    const [inpValue, setInpValue] = useState({ title: "", discription: ""});
    const [noteId, setNoteId] = useState("");

    const updateNote = (id) => {
        ref.current.click();
        setNoteId(id);
    }

    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            getALlNote();
        }// eslint-disable-next-line
    }, [])

    const inpFldChange = (e) => {
        setInpValue({ ...inpValue, [e.target.name]: e.target.value })
    }
    const UpdateBtnClk = (e) =>{
        e.preventDefault();
        if(noteId.length>=20){
            updateNotef(inpValue,noteId)
            ref.current.click();
        }
        setInpValue({ title: "", discription: ""});
    }


    const totalNote = props.cardDetail;
    return (
        <div className='container'>
            <h3 style={{ textDecoration: "underline", margin: "10px 20px" }}>Your Notes:</h3>
            <button type="button" ref={ref} data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ display: "none" }}>
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content container p-4">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                <input type="text" name='title' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={inpValue.title} onChange={inpFldChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Discription</label>
                                <input type="text" name='discription' className="form-control" id="exampleInputPassword1" value={inpValue.discription} onChange={inpFldChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn-sm mx-3" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary btn-sm" onClick={UpdateBtnClk}>Update Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='row'>
                {
                    totalNote.map((e) => {
                        return (
                            <div key={e.discription} className="col-md-2 mx-5 my-4">
                                <EachCards elements={e} updateNote={updateNote}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards;