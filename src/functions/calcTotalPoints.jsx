import { useMemo } from 'react'
import useApp from '../hooks/useApp'

function CalcPoints () {
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

  return totalRoundScore;

};

export default CalcPoints;