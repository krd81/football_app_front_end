import { Fragment, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Predictions from './Predictions';
import { CompRoundContext } from '../common/CompRoundContext';
import '../css/GameWeekSelect.css'

const GameWeekSelect = ({ setCompRound }) => {
    const { rounds } = useContext(CompRoundContext);
    const [value, setValue] = useState('');
    const nav = useNavigate();

    // sort function causing infinite loop
    // sortRounds();

    const handleClick = () => {
        // console.log(selectedRound);
        // e.preventDefault();
        // const selectedRound = e.target.value;
        // setCompRound(selectedRound);
        // console.log(value);

        // Navigate to Predictions component
        nav('/predictions')
        // return (
        //     <>
        //         <Routes>
        //             <Route path='/predictions' element={<Predictions round={value}/>}/>
        //         </Routes>
        //   </>
        // )
    }

    return (
        <>
            <div>
                {rounds.map((round) => {
                    // console.log(round);
                    return (
                        <Fragment key={round}>
                        {/* round is of type string */}
                            <div className='main'>
                                <button
                                className='game-week-tile'
                                value={round}
                                onClick={(e) => {
                                    setValue(e.target.value)
                                    setCompRound(e.target.value)
                                    handleClick()
                                }}
                                >

                                  {round}
                                    </button>
                                </div>

                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}

export default GameWeekSelect