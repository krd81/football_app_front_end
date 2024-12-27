import CalcPoints from '../functions/calcTotalPoints'

// TODO: method to determine whether at least one match is complete
// Only display Total Points if true
export const UserPointsScore = () => {

  return (
    <>
        <div className='total-score'>
          <div className='score-bg'>
            <h3 className='total-score-text'>{`${CalcPoints()} points`}</h3>
          </div>
        </div>
    </>
  )
};
