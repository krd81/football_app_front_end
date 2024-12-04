import { Fragment, useContext } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { CompRoundContext } from '../common/CompRoundContext';
import '../css/GameWeekSelect.css'

const GameWeekSelect = ({ setCompRound }) => {
    const { rounds } = useContext(CompRoundContext);
    const nav = useNavigate();


    const handleClick = (round) => {
        setCompRound(round);
        nav('/predictions');
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
                                onClick={() => {handleClick(round)}}
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
GameWeekSelect.propTypes = {
    setCompRound: PropTypes.func.isRequired,
};

export default GameWeekSelect