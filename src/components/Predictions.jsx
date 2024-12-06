import { Fragment, useContext, useMemo } from 'react'
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../common/DateFormatter'
import shortName from '../common/TeamAbbreviation';
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

  const fixtureDates = getDates(currentFixtures);



  return (
    <>
      <div>
        <h1>Predictions:</h1>
      </div>
      <div className='match-list'>
        {fixtureDates?.map((fixtureDate) => {
          return(
            <Fragment key={fixtureDate}>
              <div className='date-header'>
                {/* Displays date */}
                <h3 className='date-text'>{dateFormatter2(fixtureDate)}</h3>
              </div>
              <form action="prediction-form" key={fixtureDate}>
                {currentFixtures?.map((match) => {
                  if (match.date === fixtureDate) {
                    return (
                      <>
                        <Fragment key={match._id + fixtureDate}>
                          <div className='match-card' >
                            <div className='predictions-text'>
                              <div className='grid-container'>
                                <div className='grid-item1'>
                                  <label className='team-name' htmlFor='score-predictions'>{`${shortName(match.homeName)} `}</label>
                                </div>
                                <div className='grid-item2'>
                                  <input className='score-input' id={`${match.homeName}`} name='score-predictions' type='text' size="1"></input>
                                  &nbsp;-&nbsp;
                                  <input className='score-input' id={`${match.awayName}`} name='score-predictions' type='text' size="1"></input>
                                </div>
                                <div className='grid-item1'>
                                  <label className='team-name' htmlFor='score-predictions'>{` ${shortName(match.awayName)}`}</label>
                                </div>
                              </div>
                            </div>
                              <p className='predictions-text'>{`Kick-off: ${match.time}`}</p>
                              <p className='predictions-text'>{`${match.location}`}</p>
                          </div>

                        </Fragment>
                      </>
                    )
                  };
                })};
              </form>
            </Fragment>
          )
        })};
      </div>
    </>
  )
};

export default Predictions;