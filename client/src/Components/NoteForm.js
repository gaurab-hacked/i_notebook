import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext';
import Cards from './Cards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NoteForm = () => {
    const { postNote, allNote } = useContext(NoteContext);

    const [inpValue, setInpValue] = useState({ title: "", discription: "", category: "General" });

    const inpFldChange = (e) => {
        setInpValue({ ...inpValue, [e.target.name]: e.target.value })
    }



    const addBtnClk = (e) => {
        e.preventDefault();
        //validation
        if (inpValue.title.length < 5) {
            toast.error(<div id="tost">Title must be greater than 5 character</div>);
        }
        else if (inpValue.discription.length <= 10) {
            toast.error(<div id="tost">Discription must be greater than 10 character</div>);
        }
        else if (inpValue.category.length <= 4) {
            toast.error(<div id="tost">category must be greater than 4 character</div>);
        }
        else {
            setInpValue({ title: "", discription: "", category: "General" });
            postNote(inpValue);
        }
    }


    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" name='title' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={inpValue.title} onChange={inpFldChange} placeholder="Enter Note Title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Discription</label>
                    <input type="text" name='discription' className="form-control" id="exampleInputPassword1" value={inpValue.discription} onChange={inpFldChange} placeholder="Enter Note Discription"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Category:</label>
                    <input type="text" name='category' className="form-control" id="exampleInputPassword1" onClick={()=>setInpValue({...inpValue, category:""})} value={inpValue.category} onChange={inpFldChange} placeholder="Enter note category. Example: General"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={addBtnClk}>Add Note</button>
            </form>
            <hr />
            <Cards cardDetail={allNote} />
        </>
    )
}

export default NoteForm;