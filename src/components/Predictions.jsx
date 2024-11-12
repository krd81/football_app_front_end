import { React, useState, useEffect } from 'react'
import '../css/Scores.css'

const Predictions = () => {
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
      <h1>Predictions:</h1>
    </div>
    <div className='match-list'>
      <form action="">

     {matches?.map((match, index) => {
        return (
          <>
          <div className='match-card'>
            <span className='predictions-text'>
            <label htmlFor='score-predictions'>{`${match.homeName} `}</label>
            <input className='score-input' id={`${match.homeName}`} name='score-predictions' type='text' size="1"></input>
            &nbsp;-&nbsp;
            <input className='score-input' id={`${match.awayName}`} name='score-predictions' type='text' size="1"></input>
            <label htmlFor='score-predictions'>{` ${match.awayName}`}</label>

            </span>
            <p className='predictions-text'>{`Kick-off: ${match.time}`}</p>
            <p className='predictions-text'>{`${match.location}`}</p>
            </div>
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