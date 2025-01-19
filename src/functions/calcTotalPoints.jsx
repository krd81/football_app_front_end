import { useMemo } from 'react'
import useApp from '../hooks/useApp'

function CalcPoints () {
  const { round, allUserScores, currentUser } = useApp();
  // console.log("calc points called");
  // console.log(JSON.stringify(allUserScores));
  const userScores = useMemo(() => {
    console.log('CalcTotal points useMemo called')
    if (!(Array.isArray(allUserScores) && currentUser)) return [];

    return allUserScores.filter(scores => {
        return scores.user && scores.user._id === currentUser._id
            && scores.round === round
    });
  }, [allUserScores, currentUser, round]);

  const totalRoundScore = userScores.reduce((total, userScore) => {
    return total + (userScore.score || 0)
  }, 0);

  console.log(`Points for round: ${totalRoundScore}`)
  console.log(`allUserScores object: ${JSON.stringify(allUserScores)}`)
  // console.log(`userScores object: ${JSON.stringify(userScores)}`)

  return totalRoundScore;

};

export default CalcPoints;