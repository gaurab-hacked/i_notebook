import { TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './css/register.css'
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';


const Register = () => {
    const { postData } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [initialVal, setInitialVal] = useState({ name: "", email: "", password: "" });
    const fieldChangeFun = (e) => {
        setInitialVal({ ...initialVal, [e.target.name]: e.target.value });
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        postData(initialVal, `http://localhost:4000/api/auth/register`);
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            navigate('/')
        }// eslint-disable-next-line
    }, [])

    return (
        // <div id="loginform">
        //     <form action="#">
        //         <div className="heading">
        //             <h1>I-NoteBook</h1>
        //             <h3>Its free and always will be</h3>
        //         </div>
        //         <div className="input">
        //             <label htmlFor="name">User Name:</label>
        //             <input type="text" name="name" id="name" placeholder="Enter Your name" value={initialVal.name} onChange={fieldChangeFun} />
        //         </div>
        //         <div className="input">
        //             <label htmlFor="email">Email:</label>
        //             <input type="email" name="email" id="email" placeholder="Enter Your Email" value={initialVal.email} onChange={fieldChangeFun} />
        //         </div>
        //         <div className="input">
        //             <label htmlFor="password">Password:</label>
        //             <input type="password" name="password" id="password" placeholder="Enter Your Password" value={initialVal.password} onChange={fieldChangeFun} />
        //         </div>
        //         <p>

        //             I have account <Link to="/login"> LogIn?</Link>
        //         </p>
        //         <button onClick={handelSubmit}>Sign-Up</button>
        //     </form>
        // </div>

        <div id='logform' className='overflow-hidden'>
            <form action='#'>
                <div id='inputfields'>
                    <h1>I-NoteBook</h1>
                    <h3>Its free and always will be </h3>

                    <div className="username h-full w-full relative">
                        <TextField id="outlined-basic" label="Name" name="name" variant="outlined" className='w-full' value={initialVal.name} onChange={fieldChangeFun} />
                        <PersonIcon className=' absolute top-4 right-3 cursor-pointer' />
                    </div>
                    <div className="username h-full w-full relative mt-6">
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
                        I have account <Link to="/login"> LogIn?</Link>
                    </p>
                    <button onClick={handelSubmit}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Register;