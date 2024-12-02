import { Fragment, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Predictions from './Predictions';
import { CompRoundContext } from '../common/CompRoundContext';
import '../css/GameWeekSelect.css'

const GameWeekSelect = ({ setCompRound }) => {
    const { rounds } = useContext(CompRoundContext);
    const nav = useNavigate();

    // sort function causing infinite loop
    // sortRounds();

    const handleClick = (e) => {
        // console.log(selectedRound);
        const selectedRound = e.target.value;
        setCompRound(selectedRound);
        console.log(selectedRound);

        // Navigate to Predictions component
        nav('/predictions')
        // return (
        //     <>
        //         <Routes>
        //             <Route path='/predictions' element={<Predictions round={selectedRound}/>}/>
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
                            <div className='main'>
                                <div className='game-week-tile' onClick={() => handleClick(round)}>
                                    <p>{round}</p>

                                </div>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}

export default GameWeekSelect