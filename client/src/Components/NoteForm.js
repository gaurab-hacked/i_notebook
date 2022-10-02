import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext';
import Cards from './Cards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Form.css'
import DarkmodeContext from '../context/DarkmodeContext';



const NoteForm = () => {
    const { mode } = useContext(DarkmodeContext);

    const { postNote, allNote } = useContext(NoteContext);

    const [inpValue, setInpValue] = useState({ title: "", discription: "", category: "General" });
    const [characterLength, setCharacterLength] = useState(0);

    const inpFldChange = (e) => {
        setInpValue({ ...inpValue, [e.target.name]: e.target.value })
        setCharacterLength(inpValue.discription.trim().length);
    }



    const addBtnClk = (e) => {
        e.preventDefault();
        //validation
        if (inpValue.title.trim().length <= 3) {
            toast.error(<div id="tost">Title must be greater than 3 character</div>);
        }
        else if (inpValue.discription.trim().length <= 7 || inpValue.discription.trim().length >= 200) {
            toast.error(<div id="tost">Discription must be 7-200 character</div>);
        }
        else if (inpValue.category.trim().length <= 3) {
            toast.error(<div id="tost">category must be greater than 3 character</div>);
        }
        else {
            setInpValue({ title: "", discription: "", category: "General" });
            postNote(inpValue);
        }
    }


    return (
        <>
            <div id="noteForm">
                <form>
                    <div className="inpfld" >
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" id="title" value={inpValue.title} onChange={inpFldChange} placeholder="Enter Note Title" style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", boxShadow: "inset 0 0 3px 0 rgb(255, 255, 255, .6)"}:{}} />
                    </div>
                    <div className="inpfld textarea">
                        <label htmlFor="discription">Discription:</label>
                        <textarea name="discription" id="discription" cols="30" rows="10"
                            value={inpValue.discription} onChange={inpFldChange} placeholder="Enter Note Discription" style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", boxShadow: "inset 0 0 3px 0 rgb(255, 255, 255, .6)"}:{}}>
                        </textarea>
                        <div className="lettercount" style={characterLength >= 200 ? { color: "rgb(255, 34, 34)" } : { color: "black" }} >
                            {characterLength}/200 Characters
                        </div>
                    </div>
                    <div className="inpfld">
                        <label htmlFor="category">Catagories:</label>
                        <input type="text" name="category" id="category"
                            onClick={() => setInpValue({ ...inpValue, category: "" })} value={inpValue.category} onChange={inpFldChange} placeholder="Enter note category. Example: General" style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", boxShadow: "inset 0 0 3px 0 rgb(255, 255, 255, .6)"}:{}}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addBtnClk}>Add Note</button>
                </form>
            </div>
            <hr />

            <Cards cardDetail={allNote} />
        </>
    )
}

export default NoteForm;