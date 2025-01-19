import CalcPoints from '../functions/calcTotalPoints'

// TODO: method to determine whether at least one match is complete
// Only display Total Points if true
export const UserTotalPoints = ({ totalPoints, updatePointsTotal }) => {
  const newPointsTotal = CalcPoints();
  updatePointsTotal(newPointsTotal);


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
