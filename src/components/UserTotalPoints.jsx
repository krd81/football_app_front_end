/* eslint-disable react/prop-types */
import { useMemo } from 'react'
import useApp from '../hooks/useApp'

// DisplayFixtures.jsx ensures UserTotalPoints only displayed if
// at least one match has started
export const UserTotalPoints = ({ totalPoints, updatePointsTotal }) => {
  const { round, userScores, currentUser } = useApp();

  const filteredScores = useMemo(() => {
    console.log('CalcTotal points useMemo called')
    if (!(Array.isArray(userScores) && currentUser)) return [];

    return userScores.filter(scores => {
        return scores.round && scores.round === round
    });
  }, [userScores, currentUser, round]);

  const totalRoundScore = filteredScores.reduce((total, userScore) => {
    return total + (userScore.score || 0)
  }, 0);

  console.log(`Points for round: ${totalRoundScore}`)
  console.log(`allUserScores object: ${JSON.stringify(userScores)}`)
  console.log(`filtered scores: ${JSON.stringify(filteredScores)}`)

  updatePointsTotal(totalRoundScore);




  return (
    <>
        <div className='total-score'>
          <div className='score-bg'>
            <span className='total-score-text'>{totalPoints}&nbsp;</span>
            <span className='total-score-text'>{totalPoints === 1 ? 'point' : 'points'}</span>
          </div>
        </div>
    </>
  )
};
