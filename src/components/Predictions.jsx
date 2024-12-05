import { Fragment, useContext, useMemo } from 'react'
import '../css/Scores.css'
import { AppContext } from '../authentication/AppContext';


const Predictions = ({ round }) => {
  const { fixtures } = useContext(AppContext);

  const currentFixtures = useMemo(() => {
    return getRoundFixtures(fixtures, round);
  }, [fixtures, round]);

  function getRoundFixtures (fixtures, round) {
    const newFixtures = [];
    for (let fixture in fixtures) {
        for (let matchElement in fixtures[fixture]) {
            if (matchElement === 'round' &&
                  fixtures[fixture][matchElement] === round) {
                    newFixtures.push(fixtures[fixture]);
            }
        }
    }
    return newFixtures;
  }


  return (
    <>
      <div>
        <h1>Predictions:</h1>
      </div>
      <div className='match-list'>
        <form action="prediction-form">
          {currentFixtures?.map((match) => {
              return (
                <>
                  <Fragment key={match._id}>
                    <div className='match-card' >
                      <div className='predictions-text'>
                        <div className='grid-container'>
                          <div className='grid-item1'>
                            <label htmlFor='score-predictions'>{`${match.homeName} `}</label>
                          </div>
                          <div className='grid-item2'>
                            <input className='score-input' id={`${match.homeName}`} name='score-predictions' type='text' size="1"></input>
                            &nbsp;-&nbsp;
                            <input className='score-input' id={`${match.awayName}`} name='score-predictions' type='text' size="1"></input>
                          </div>
                          <div className='grid-item1'>
                            <label htmlFor='score-predictions'>{` ${match.awayName}`}</label>
                          </div>
                        </div>
                      </div>
                        <p className='predictions-text'>{`Kick-off: ${match.time}`}</p>
                        <p className='predictions-text'>{`${match.location}`}</p>
                    </div>

                  </Fragment>
                </>
              )
            })
          }
        </form>
      </div>
    </>
  )
}

export default Predictions