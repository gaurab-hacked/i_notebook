import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import './css/Login.css'

const Register = () => {
    const { postData } = useContext(UserContext);
    const [initialVal, setInitialVal] = useState({ name: "", email: "", password: "" });
    const fieldChangeFun = (e) => {
        setInitialVal({ ...initialVal, [e.target.name]: e.target.value });
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        postData(initialVal, `http://localhost:4000/api/auth/register`);
    }
    return (
        <div id="loginform">
            <form action="#">
                <div class="heading">
                    <h1>I-NoteBook</h1>
                    <h3>Please Register To Save Your Notes:</h3>
                </div>
                <div class="input">
                    <label for="name">User Name:</label>
                    <input type="text" name="name" id="name" placeholder="Enter Your name" value={initialVal.name} onChange={fieldChangeFun}/>
                </div>
                <div class="input">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" placeholder="Enter Your Email" value={initialVal.email} onChange={fieldChangeFun}/>
                </div>
                <div class="input">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter Your Password" value={initialVal.password} onChange={fieldChangeFun}/>
                </div>
                <a href="./Login.html">I have account LogIn?</a>
                <button onClick={handelSubmit}>Sign-Up</button>
            </form>
        </div>
    )
}

export default Register;