import React, { useContext, useState } from 'react'
import DarkmodeContext from '../context/DarkmodeContext';
import NoteContext from '../context/NoteContext';
import './css/Cards.css'

const EachCards = (props) => {
    const {mode} = useContext(DarkmodeContext);
    const { updateNote } = props;
    const { deleteNote } = useContext(NoteContext);
    const data = props.elements;
    const [copyMsg, setCopyMsg] = useState(false);
    const copyfun = () => {
        navigator.clipboard.writeText(data.discription);
        setCopyMsg(true)
    }
    const rawTitle = data.title.slice(0, 20);
    const title = rawTitle.slice(0, 1).toUpperCase() + rawTitle.substring(1);


    return (
        <>
            <div id="NoteCards" key={data._id}  style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white", boxShadow:" inset 0 0 3px 0 rgb(255, 255, 255, .6)"}:{}}>
                <div className="head">
                    <h3>{data.title.length<12?title:title+'...'}</h3>
                    <i className="fa-regular fa-copy" id="copy" onClick={copyfun} style={copyMsg ? { color: "black" } : { color: "rgb(0, 0, 0, .6)" }}></i>
                </div>
                <p  style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white"}:{}}>
                    {data.discription}
                </p>
                <div className="extrainfo" >
                    <p id="catagory" style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white"}:{}}> - {data.category[0].toUpperCase() + data.category.substring(1, 9) || "General"}</p>
                    <p style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white"}:{}}> <b style={mode==="dark"?{backgroundColor:"rgb(25, 25, 26)", color:"white"}:{}}> Date: </b> {data.date === undefined ? "now" : data.date.substring(0, 10)}</p>
                </div>
                <div className="buttons">
                    <button onClick={() => updateNote(data._id)}>update</button>
                    <button onClick={() => deleteNote(data._id)} >delete</button>
                </div>
            </div>
        </>
    )
}

export default EachCards;