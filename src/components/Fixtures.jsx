import { Fragment, useContext, useMemo } from 'react'
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../functions/dateTimeFormatter'
import shortName from '../functions/nameAbbreviation';
import { AppContext } from '../authentication/AppContext';

const Fixtures = ({ round }) => {
  const { fixtures, results } = useContext(AppContext);

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

// Not tested in this component
  function getMatchResult (fixture_id) {
    const matchResult = [];
    for (let result in results) {
      for (let matchElement in results[result]) {
        if (matchElement === 'fixture_id' &&
            results[result][matchElement] === fixture_id) {
              matchResult.push(results[result]);
            }
      }
    }
    return matchResult;
  };

  const fixtureDates = getDates(currentFixtures);


  return (
    <>
      <div>
        <h1>Fixtures - Matchweek etc {round}:</h1>
      </div>
      <div className='match-list'>
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