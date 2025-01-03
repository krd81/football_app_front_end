import { useMemo } from 'react'
import useApp from '../hooks/useApp'

function CalcPoints () {
  const { round, allUserScores, currentUser } = useApp();
  // console.log("calc points called");
  // console.log(JSON.stringify(allUserScores));
  const userScores = useMemo(() => {
    return allUserScores.filter(scores => {
        return scores.user && scores.user._id === currentUser._id
            && scores.round === round
    });

  }, [allUserScores, currentUser._id, round]);

  const totalRoundScore = userScores.reduce((total, userScore) => {
    return total + (userScore.score || 0)
  }, 0);

  return totalRoundScore;

};

export default CalcPoints;