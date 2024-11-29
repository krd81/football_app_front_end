import { React, useContext } from 'react'
import '../css/Scores.css'
import DateFormatter from '../common/DateFormatter'
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
          <>
          <div className='match-card' key={index}>
            <p>{`${index+1}. ${match.homeName} vs ${match.awayName}`}</p>
            <p>{`Date: ${DateFormatter(match.date)}`}</p>
            <p>{`Kick-off: ${match.time}`}</p>
            <p>{`${match.location}`}</p>
            </div>
          </>
        )
      })
    }
    </div>
    </>
  )
}

export default Fixtures;