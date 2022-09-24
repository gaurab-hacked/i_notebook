import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const [allNote, setAllNote] = useState([]);


    
    // Fetch all notes
    const getALlNote = async () => {
        const url = 'http://localhost:4000/api/note/fetchNote';
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
        const res = await response.json();
        setAllNote(res);
    }
    
    // post notes add by users
    const postNote = async (data, urlP) => {
        const url = urlP;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        const res = await response.json();
        console.log(res);
    }
    

    // delete note
    const deleteNote = async (id)=>{
        // console.log("Note Deleted "+ id)
        const url = `http://localhost:4000/api/note/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
        const res = await response.json();
        console.log(res);
    }


    //update note
    const updateNotef = async (data, urlP) => {
        const url = urlP;
        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        const res = await response.json();
        console.log(res);
    }



    return (
        <NoteContext.Provider value={{allNote, postNote, getALlNote, deleteNote, updateNotef}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState