import { React, useState, useEffect } from 'react'

const Fixtures = () => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const fixtures = await fetch(`${apiUrl}/fixtures/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
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
      <p>${matches[0].homeName} vs ${matches[0].awayName}</p>
    </div>
    </>
  )
}

export default Fixtures