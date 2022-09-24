import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

const Login = () => {
    const {postData} = useContext(UserContext);
    const [initialVal, setInitialVal] = useState({email:"", password:""});

    const fieldChangeFun = (e) =>{
        setInitialVal({...initialVal, [e.target.name]:e.target.value});
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        postData(initialVal, `http://localhost:4000/api/auth/login`);
    }


    return (
        <div className='container my-5'>
            <h2 className='text-center my-2'>Please Login To See Your Notes</h2>
            <form>
                <div className="mb-3 p-2">
                    <label htmlFor="email" className="form-label">Email address:</label>
                    <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" placeholder='Enter Your Email Address' value={initialVal.email} onChange={fieldChangeFun}/>
                </div>
                <div className="mb-3 p-2">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" name='password' className="form-control" id="password" placeholder='Enter Your Password'  value={initialVal.password} onChange={fieldChangeFun}/>
                </div>
                <button type="submit" className="btn btn-primary m-2" onClick={handelSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Login;