import { useContext, useState, useMemo } from 'react'
import { AppContext } from '../authentication/AppContext'


export const UserTotalRoundScore = ({ round }) => {
  const { allUserScores, setAllUserScores, currentUser } = useContext(AppContext);

  const userScores = useMemo(() => {
    return allUserScores.filter(scores => {
        return scores.user && scores.user._id === currentUser._id
            && scores.round === round
    });

  }, [allUserScores, currentUser._id, round]);

  const totalRoundScore = userScores.reduce((total, userScore) => {
    return total + (userScore.score || 0)
  }, 0);

  return (
    <>
        <div className='total-score'>
          <div className='score-bg'>
            <h3 className='total-score-text'>{`${totalRoundScore} points`}</h3>
          </div>
        </div>
    </>
  )
};

