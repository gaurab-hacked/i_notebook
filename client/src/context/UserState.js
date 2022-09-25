import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserState = (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getUserData();
        }
    }, [navigate])


    // Login and register routes
    const postData = async (data, urlP) => {
        const url = urlP;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if (res.msg === "success") {
            //save data in localstorage and navigate to Home page
            localStorage.setItem("auth-token", res.Key);
            navigate("/");
        }
        else {
            console.log(res);
            toast.error(<div id="tost">{res.msg}</div>);
        }
    }

    const getUserData = async () => {
        const url = 'http://localhost:4000/api/auth/getuser';
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
            referrerPolicy: 'no-referrer'
        });
        const res = await response.json();
        setUserData(res);
    }
    // console.log(userData)


    return (
        <>
            <UserContext.Provider value={{ postData, userData, setUserData }}>
                {props.children};
            </UserContext.Provider>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                theme="colored"
            />
        </>
    )
}
export default UserState;