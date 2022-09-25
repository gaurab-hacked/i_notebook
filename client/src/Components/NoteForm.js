import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext';
import Cards from './Cards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NoteForm = () => {
    const { postNote, allNote } = useContext(NoteContext);

    const [inpValue, setInpValue] = useState({ title: "", discription: "", category: "" });

    const inpFldChange = (e) => {
        setInpValue({ ...inpValue, [e.target.name]: e.target.value })
    }



    const addBtnClk = (e) => {
        e.preventDefault();
        //validation
        if (inpValue.title.length <= 5) {
            toast.error(<div id="tost">Title must be greater than 5 character</div>);
        }
        else if (inpValue.discription.length <= 10) {
            toast.error(<div id="tost">Discription must be greater than 10 character</div>);
        }
        else if (inpValue.category.length <= 4) {
            toast.error(<div id="tost">category must be greater than 4 character</div>);
        }
        else {
            setInpValue({ title: "", discription: "", category: "" });
            postNote(inpValue);
        }
    }



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
            <Cards cardDetail={allNote} />
        </>
    )
}

export default NoteForm;