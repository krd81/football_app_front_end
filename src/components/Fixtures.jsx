import { React, Fragment, useContext } from 'react'
import '../css/Scores.css'
import DateFormatter from '../common/DateFormatter'
import { AppContext } from '../authentication/AppContext';

const Fixtures = () => {
  const { fixtures } = useContext(AppContext);

  let rounds = [];

  for (let fixture in fixtures) {
    for (let match in fixtures[fixture]) {
      for (let round in fixtures[fixture][match]) {
      console.log(match)
      console.log(round)
      if (rounds.includes(fixtures[fixture][match][round])) {
        continue;
      } else {
        [...rounds, fixtures[fixture][match][round]];
      }
      // Splitting words down to individual elements (letters)
      console.log(fixtures[fixture][match][round])
    }
  }
}

  console.log(rounds);

  return (
    <>
    <div>
      <h1>Fixtures:</h1>
    </div>
    <div>
     {fixtures?.map((match, index) => {
        return (
          <Fragment key={match._id}>
          <div className='match-card'>
            <p>{`${index+1}. ${match.homeName} vs ${match.awayName}`}</p>
            <p>{`Date: ${DateFormatter(match.date)}`}</p>
            <p>{`Kick-off: ${match.time}`}</p>
            <p>{`${match.location}`}</p>
            </div>
          </Fragment>
        )
      })
    }
    </div>
    </>
  )
}

export default Fixtures;