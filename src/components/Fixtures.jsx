import { Fragment, useContext } from 'react'
import '../css/Scores.css'
import DateFormatter1 from '../common/DateFormatter'
import shortName from '../common/TeamAbbreviation';
import { AppContext } from '../authentication/AppContext';

const Fixtures = () => {
  const { fixtures } = useContext(AppContext);


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
            <p>{`${index+1}. ${shortName(match.homeName)} vs ${shortName(match.awayName)}`}</p>
            <p>{`Date: ${DateFormatter1(match.date)}`}</p>
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