import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext';
const EachCards = (props) => {
    const  {updateNote} = props;
    const { deleteNote } = useContext(NoteContext);
    const data = props.elements;
    return (
        <>

            <div className="card" style={{ width: "18rem" }} key={data.discription}>
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.discription}</p>
                    <div className='d-flex justify-content-around'>
                        <h6 className="card-subtitle mb-2 text-muted mx-2 my-1"> -  {data.category[0].toUpperCase() + data.category.substring(1,9) || "User"}</h6>
                        <p style={{ color: "rgb(0,0,0,.7)", fontSize: "14px", marginTop: "5px" }}><b style={{ color: "rgb(0, 0, 0, .5)" }}> Date:</b>  {data.date === undefined ? "now" : data.date.substring(0, 10)}</p>
                    </div>

                    <div className='d-flex justify-content-around'>

                        <button className='btn btn-sm btn-primary m-2' onClick={()=>updateNote(data._id)}>Update</button>
                        <button className='btn btn-sm btn-primary m-2' onClick={() => deleteNote(data._id)} >Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EachCards;