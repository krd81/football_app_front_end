import { React, useState, useEffect } from 'react'

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
      <h1>Hello everyone!</h1>
      {matches[0]?
        <p>{`${matches[0].homeName} vs ${matches[0].awayName}`}</p>
        :
        null }
    </div>
    </>
  )
}

export default Fixtures