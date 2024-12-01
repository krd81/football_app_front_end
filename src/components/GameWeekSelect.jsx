import { Fragment, useContext } from 'react'
import { CompRoundContext } from '../common/CompRoundContext';
import '../css/GameWeekSelect.css'

const GameWeekSelect = () => {
    const { rounds, setRound } = useContext(CompRoundContext);

    // sort function causing infinite loop
    // sortRounds();

    const handleClick = (selectedRound) => {
        // console.log(selectedRound);
        setRound(selectedRound);
    }

    return (
        <>
            <div>
                {rounds.map((round) => {
                    // console.log(round);
                    return (
                        <Fragment key={round}>
                            <div className='main'>
                                <div className='game-week-tile' onClick={handleClick(round)}>
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