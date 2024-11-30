import { Fragment, useContext } from 'react'
import { CompRoundContext } from '../common/CompRoundContext';


const GameWeekSelect = () => {
    const { rounds, setRound } = useContext(CompRoundContext);

    const handleClick = (selectedRound) => {
        console.log(selectedRound);
        setRound(selectedRound);
    }

    return (
        <>
            <div>
                {rounds.map((round) => {
                    console.log(round);
                    return (
                        <Fragment key={round}>
                            <div onClick={handleClick(round)}>
                                <p>{round}</p>

                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}

export default GameWeekSelect