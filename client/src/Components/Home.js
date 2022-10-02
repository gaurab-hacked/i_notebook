import React, { useContext, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import UserContext from '../context/UserContext';
import NoteForm from './NoteForm';
import './css/Form.css'


const Home = () => {
  const { setCardhide } = useContext(SearchContext);
  
  //find userDetail 
  const {userData} = useContext(UserContext);
  const rawName = userData.name||"User";

  const Name = rawName[0].toUpperCase() + rawName.substring(1);
  const fName = Name.split(" ")[0];
  
  //to navigate unathorige users
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'I-NoteBook'
    if(localStorage.getItem("auth-token")===null){
      navigate("/register");
    };// eslint-disable-next-line
  }, []);
  

  return (
    <div className='container' onClick={()=> setCardhide(true)}>
      <h2 className='text-center heading'>Hello {fName}, Please Enter Your Notes Here!!!</h2>
      <NoteForm/>
    </div>
  )
}

export default Home;