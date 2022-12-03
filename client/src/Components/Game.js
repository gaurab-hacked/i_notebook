import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DarkmodeContext from '../context/DarkmodeContext';
import './css/Game.css'
import { AiOutlineReload } from 'react-icons/ai';
// import { FaHandScissors, FaHandPaper, FaHandRock } from 'react-icons/fa';
import { toast } from 'react-toastify';



const Game = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'I-NoteBook Game'
        if (!localStorage.getItem('auth-token')) {
            navigate("/register")
        }// eslint-disable-next-line
    }, [])
    const { mode } = useContext(DarkmodeContext);

    // to deside Max round 
    const [maxRound, steMaxRound] = useState(0);

    // scssior ====> 1
    // paper ====> 2
    // rock ====> 3



    // const checkEmoji = (num) => {
    //     if (maxRound > 0) {
    //         if (num === 1) {
    //             return <FaHandScissors />;
    //         }
    //         else if (num === 2) {
    //             return <FaHandPaper />;
    //         }
    //         else {
    //             return <FaHandRock />;
    //         }
    //     }
    // }

    const checkEmoji = (num) => {
        if (maxRound > 0) {
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
    }

    const [data, setData] = useState([]);
    const [choose, setChoose] = useState({ pc: '', per: '' });
    const [perScore, setPerScore] = useState(0)
    const [pcScore, setPcScore] = useState(0)
    const [DrawScore, setDrawScore] = useState(0)
    const [winner, setWinner] = useState('');

    const choiceBtnClk = (num) => {
        const pc = Math.floor(Math.random(0) * 3) + 1;
        DesideWinner(num, pc)
        setChoose({ pc, per: num });
    }
    useEffect(() => {
        if (maxRound > 0) {
            setData(data.concat(choose));
        }
        // eslint-disable-next-line
    }, [choose])

    const exactData = data.filter((e) => e.per !== "").slice(0, maxRound);
    useEffect(() => {
        if (exactData.length + 1 === maxRound) {
            console.log("exc")
            if (pcScore > perScore) {
                setWinner('pc');
                toast.error(<div id="tost">PC Win The Match</div>);
            }
            else if (perScore > pcScore) {
                setWinner('per');
                toast.success(<div id="tost">Person Win The Match</div>);
            }
            else {
                setWinner('draw');
                toast.warning(<div id="tost">It's Draw</div>);
            }
        }
        // eslint-disable-next-line
    }, [choose])

    const DesideWinner = (per, pc) => {
        if (maxRound > 0) {
            if (DrawScore + pcScore + perScore < maxRound) {
                if (per === pc) {
                    setDrawScore(p => p + 1);
                }
                else if (per === 1 && pc === 2) {
                    setPerScore(p => p + 1);
                }
                else if (per === 1 && pc === 3) {
                    setPcScore(p => p + 1);
                }
                else if (per === 2 && pc === 1) {
                    setPcScore(p => p + 1);
                }
                else if (per === 2 && pc === 3) {
                    setPerScore(p => p + 1);
                }
                else if (per === 3 && pc === 1) {
                    setPerScore(p => p + 1);
                }
                else if (per === 3 && pc === 2) {
                    setPcScore(p => p + 1);
                }
                else {
                    setDrawScore(p => p + 1);
                }
            }
        }
    }

    return (
        <div className='overflow-hidden' style={mode === "dark" ? { backgroundColor: "rgb(25, 25, 26)", color: "white", height: "92vh" } : {}}>
            <h3 className='text-center py-5 gameHead font-semibold'>Please Choose One Option</h3>
            <div className="options relative">
                <div className="score absolute left-[150px] w-[380px] flex flex-col gap-2">
                    {
                        maxRound <= 0 ?
                            <>
                                <h3 className='text-xl tracking-widest font-semibold underline mb-1'>Choose Best Of:</h3>
                                <div className="cards flex gap-4 mt-3 justify-center">
                                    <p onClick={() => steMaxRound(1)} className='h-[70px] w-[60px] select-none hover:scale-110 duration-500 bg-orange-500 cursor-pointer text-xl font-bold shadow-inner rounded-sm flex items-center justify-center'>1</p>
                                    <p onClick={() => steMaxRound(3)} className='h-[70px] w-[60px] select-none hover:scale-110 duration-500 bg-orange-500 cursor-pointer text-xl font-bold shadow-inner rounded-sm flex items-center justify-center'>3</p>
                                    <p onClick={() => steMaxRound(5)} className='h-[70px] w-[60px] select-none hover:scale-110 duration-500 bg-orange-500 cursor-pointer text-xl font-bold shadow-inner rounded-sm flex items-center justify-center'>5</p>
                                </div>
                            </>
                            :
                            <h3 className='text-2xl tracking-wide font-semibold mb-1 text-orange-600'>[ You are Playing Best Of <b>{maxRound}</b> ]</h3>
                    }
                    {
                        winner !== '' ?
                            <>
                                <h3 className='text-2xl tracking-wide font-semibold mb-1 text-red-600'>{winner === 'pc' ? 'Sorry You Loose!!!' : ''}</h3>
                                <h3 className='text-2xl tracking-wide font-semibold mb-1 text-orange-600'>{winner === 'per' ? 'Congratulations You Win!!!' : ''}</h3>
                                <h3 className='text-2xl tracking-wide font-semibold mb-1 text-white'>{winner === 'draw' ? "Ohh It's Draw!!!" : ''}</h3>
                            </>
                            : ''
                    }

                    {
                        winner !== '' ?
                            <div className='text-3xl absolute -bottom-[100px] select-none flex items-center justify-center flex-col gap-2'>
                                <p className='text-xl tracking-wider text-green-500 font-bold'> Play Again</p>
                                <AiOutlineReload className='text-3xl cursor-pointer hover:text-orange-600 duration-500' onClick={() => window.location.reload(false)} />
                            </div> : ''
                    }
                </div>
                <div className="choice scssior" onClick={() => choiceBtnClk(1)}>✌️</div>
                <div className="choice paper" onClick={() => choiceBtnClk(2)}>🖐️</div>
                <div className="choice rock" onClick={() => choiceBtnClk(3)}>🤛</div>
                <div className="score absolute right-[300px]">
                    <h3 className='text-xl tracking-wider font-semibold underline mb-1'>Score:</h3>
                    <p>You: <span>{perScore}</span> </p>
                    <p>Computer: <span>{pcScore}</span> </p>
                    <p>Draw: <span>{DrawScore}</span> </p>
                </div>
            </div>
            <div className="results">
                <table className='mt-3'>
                    <thead>
                        {
                            exactData.length >= 1 ?
                                <tr>
                                    <th className='You'>You</th>
                                    <th className='PC'>Computer</th>
                                </tr> : ''
                        }
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