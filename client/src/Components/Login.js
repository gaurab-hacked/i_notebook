import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './css/Login.css'
import { TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const { postData } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [initialVal, setInitialVal] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const fieldChangeFun = (e) => {
        setInitialVal({ ...initialVal, [e.target.name]: e.target.value });
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        postData(initialVal, `http://localhost:4000/api/auth/login`);
    }
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            navigate('/')
        }// eslint-disable-next-line
    }, [])

    return (
        <>
            {/* <div id="loginform">
                <form action="#">
                    <div className="heading">
                        <h1>I-NoteBook</h1>
                        <h3>Please Login To See Your Notes:</h3>
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" placeholder="Enter Your Email" value={initialVal.email} onChange={fieldChangeFun} />
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="Enter Your Password" value={initialVal.password} onChange={fieldChangeFun} />
                    </div>
                    <p>
                        I don't have account <Link to="/register">SignUp?</Link>
                    </p>
                    <button onClick={handelSubmit}>Log-In</button>
                </form>
            </div>
        </> */}
            <div id='container' className='overflow-hidden'>
                <div id='paragraph'>
                    <h2> I-NoteBook </h2>
                    <p> Save your notes and share it with your friends and other world </p>
                </div>
                <div id='loginform' className='overflow-hidden'>
                    <form action='#'>
                        <div id='inputfields'>
                            <h1 id='login'>Login To See Your Notes </h1>

                            <div className="username h-full w-full relative">
                                <TextField id="outlined-basic" label="Email" name="email" variant="outlined" className='w-full' value={initialVal.email} onChange={fieldChangeFun} />
                                <EmailIcon className=' absolute top-4 right-3 cursor-pointer' />
                            </div>

                            <div className="username h-full w-full relative mt-6" >
                                <TextField type={showPassword ? `text` : `password`} id="outlined-basic_Pass" name="password" value={initialVal.password} onChange={fieldChangeFun} label="Password" variant="outlined" className='w-full' />
                                {
                                    showPassword ?

                                        <VisibilityIcon onClick={() => setShowPassword(!showPassword)} className=' absolute top-4 right-3 cursor-pointer' /> : <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} className=' absolute top-4 right-3 cursor-pointer' />
                                }
                            </div>
                            <p>
                                I don't have account <Link to="/register">SignUp?</Link>
                            </p>
                    
                            <div id='log' className="mt-4">
                                <button onClick={handelSubmit}>Log In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;