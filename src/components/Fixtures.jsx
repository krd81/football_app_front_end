import { React, useState, useEffect } from 'react'
import '../css/Fixtures.css'

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
          <div className='match-list'>
            <p>{`${index+1}. ${match.homeName} vs ${match.awayName}`}</p>
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