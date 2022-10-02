import { useEffect, useState } from 'react'
import DarkmodeContext from './DarkmodeContext'


const DarkModeState = (props) => {
    const [ mode, setMode ] = useState("light"); //dark
    if(!localStorage.getItem("mode")){
        localStorage.setItem("mode","light")
    }
    const toggleMode = () =>{
        if(mode==="light"){
            localStorage.setItem("mode","dark")
        }
        else{
            localStorage.setItem("mode","light")
        }
        setMode(localStorage.getItem("mode"))
    }
    useEffect(()=>{
        setMode(localStorage.getItem("mode"))
    },[])
  return (
    <DarkmodeContext.Provider value={{mode, toggleMode}}>
        {props.children}
    </DarkmodeContext.Provider>
  )
}

export default DarkModeState
