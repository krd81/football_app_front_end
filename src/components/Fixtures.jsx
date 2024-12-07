import { Fragment, useContext, useMemo } from 'react'
import '../css/Scores.css'
import getDates from '../functions/getDates';
import dateFormatter2 from '../functions/dateFormatter'
import shortName from '../functions/nameAbbreviation';
import { AppContext } from '../authentication/AppContext';

const Fixtures = ({ round }) => {
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
        <h1>Fixtures - Matchweek {round}:</h1>
      </div>
      <div>
        {fixtureDates?.map((fixtureDate) => {
          return (
            <Fragment key={fixtureDate}>
              <div className='date-header'>
                  {/* Displays date */}
                  <h3 className='date-text'>{dateFormatter2(fixtureDate)}</h3>
                </div>
                  {fixtures?.map((match) => {
                  if (match.date === fixtureDate) {

                    return (
                      <Fragment key={match._id}>
                        <div className='match-card'>
                          <span>{shortName(match.homeName)}&ensp;</span>
                          <span><img src='' alt='home-icon'></img></span>
                          <span>&emsp;{match.time}&emsp;</span>
                          <span><img src='' alt='away-icon'></img></span>
                          <span>&ensp;{shortName(match.awayName)}</span>
                        </div>
                      </Fragment>
                    )
                  }
                  })};
            </Fragment>

          )
        })};
    </div>
  </>
)};

export default Fixtures;