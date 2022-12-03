import { useState } from "react";
import NoteContext from "./NoteContext";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NoteState = (props) => {
    const [allNote, setAllNote] = useState([]);
    const host = 'http://localhost:4000';

    // Fetch all notes
    const getALlNote = async () => {
        const url = `${host}/api/note/fetchNote`;
        //API call
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
    const postNote = async (data) => {
        //API call
        const url = `${host}/api/note/uploadNote`;
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
        //for frontend
        let datas = [res.note]
        setAllNote(allNote.concat(datas));
        toast.success(<div id="tost">{res.success}</div>);

    }


    // delete note
    const deleteNote = async (id) => {
        //API call
        const url = `${host}/api/note/deletenote/${id}`;
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

        const filterNote = (e) => {
            return e._id !== id;
        }
        //for frontend
        const newnote = allNote.filter(filterNote)
        setAllNote(newnote);
        toast.success(<div id="tost">{res.success}</div>);
    }


    //update note
    const updateNotef = async (data, id) => {
        //API call
        const url = `${host}/api/note/updatenote/${id}`;
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
        const { discription, title } = res.updatedNote


        //for frontend
        for (let i = 0; i < allNote.length; i++) {
            const element = allNote[i];
            if (element._id === id) {
                element.title = title;
                element.discription = discription;
                setAllNote([...allNote])
            }
        }
        toast.success(<div id="tost">{res.update}</div>);
    }




    return (
        <>
            <NoteContext.Provider value={{ allNote, postNote, getALlNote, deleteNote, updateNotef }}>
                {props.children}
            </NoteContext.Provider>
        </>
    )

}

export default NoteState