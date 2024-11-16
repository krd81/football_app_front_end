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