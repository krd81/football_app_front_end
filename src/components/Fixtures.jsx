import { React, useState, useEffect } from 'react'
import '../css/Scores.css'
import DateFormatter from '../common/DateFormatter'

const Fixtures = () => {
  const [matches, setMatches] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        // const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrl = 'http://127.0.0.1:8002';
        const fixtures = await fetch(`${apiUrl}/fixtures/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `null`
          }
        })
        const fixtureData = await fixtures.json();
        setMatches(fixtureData);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <>
    <div>
      <h1>Fixtures:</h1>
    </div>
    <div>
     {matches?.map((match, index) => {
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

export default Fixtures