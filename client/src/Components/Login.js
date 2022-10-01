import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import './css/Login.css'

const Login = () => {
    const { postData } = useContext(UserContext);
    const [initialVal, setInitialVal] = useState({ email: "", password: "" });

    const fieldChangeFun = (e) => {
        setInitialVal({ ...initialVal, [e.target.name]: e.target.value });
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        postData(initialVal, `http://localhost:4000/api/auth/login`);
    }


    return (
        <div id="loginform">
            <form action="#">
                <div className="heading">
                    <h1>I-NoteBook</h1>
                    <h3>Please Login To See Your Notes:</h3>
                </div>
                <div className="input">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" placeholder="Enter Your Email" value={initialVal.email} onChange={fieldChangeFun}/>
                </div>
                <div className="input">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter Your Password" value={initialVal.password} onChange={fieldChangeFun}/>
                </div>
                <a href="./Register.html">I don't have account SignUp?</a>
                <button onClick={handelSubmit}>Log-In</button>
            </form>
        </div>
    )
}

export default Login;