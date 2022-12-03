import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DarkmodeContext from '../context/DarkmodeContext';
import './css/Game.css'

const Game = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'I-NoteBook AboutUs'
        if (!localStorage.getItem('auth-token')) {
            navigate("/register")
        }// eslint-disable-next-line
    }, [])
    const { mode } = useContext(DarkmodeContext);

    // scssior ====> 1
    // paper ====> 2
    // rock ====> 3

    const checkEmoji = (num) => {
        if (num === 1) {
            return '✌️';
        }
        else if (num === 2) {
            return '🖐️';
        }
        else {
            return '🤛';
        }

    }

    const [data, setData] = useState([]);
    const [choose, setChoose] = useState({ pc: '', per: '' });

    const choiceBtnClk = (num) => {
        const pc = Math.floor(Math.random(0) * 3) + 1;
        DesideWinner(num, pc)
        setChoose({ pc, per: num });
    }
    useEffect(() => {
        setData(data.concat(choose));
        // eslint-disable-next-line
    }, [choose])

    const exactData = data.filter((e) => e.per !== "");
    // console.log(exactData);

    const DesideWinner = (per, pc) => {
        if (per === pc) {
            console.log("Draw");
        }
        else if (per === 1 && pc === 2) {
            console.log("Person win")
        }
        else if (per === 1 && pc === 3) {
            console.log("PC win")
        }
        else if (per === 2 && pc === 1) {
            console.log("PC win")
        }
        else if (per === 2 && pc === 3) {
            console.log("Person win")
        }
        else if (per === 3 && pc === 1) {
            console.log("Person win")
        }
        else if (per === 3 && pc === 2) {
            console.log("PC win")
        }
        else {
            console.log("Draw")
        }
    }


    return (
        <div style={mode === "dark" ? { backgroundColor: "rgb(25, 25, 26)", color: "white", height: "100vh" } : {}}>
            <h3 className='text-center py-5 gameHead'>Please Choose One Option</h3>
            <div className="options">
                <div className="choice scssior" onClick={() => choiceBtnClk(1)}>✌️</div>
                <div className="choice paper" onClick={() => choiceBtnClk(2)}>🖐️</div>
                <div className="choice rock" onClick={() => choiceBtnClk(3)}>🤛</div>
                <div className="score">
                    
                </div>
            </div>
            <div className="results">
                <table>
                    <thead>
                        <tr>
                            <th className='You'>You</th>
                            <th className='PC'>Computer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            exactData.map((e, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='You'>{checkEmoji(e.per)}</td>
                                        <td>{checkEmoji(e.pc)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Game