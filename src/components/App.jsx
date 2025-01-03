import '../css/app.css'
import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useApp from '../hooks/useApp'
// import { CompRoundContext } from '../common/CompRoundContext';
import NavBar from './NavBar'
import Login from '../pages/Login'
import Homepage from '../pages/Homepage'
import Play from './Play'
import Fixtures from '../pages/Fixtures'
import DisplayFixtures from '../pages/DisplayFixtures'
import CompetitionSelection from './CompetitionSelection';
import GameWeekSelect from '../pages/GameWeekSelect';

function App() {
  const {setCompetitions, selectedCompetition, setSelectedCompetition, setFixtures, setResults, setUsers, setAllUserScores, setAllPredictions, round, setRound} = useApp();

  // Fetch call to manage all external data required for the app
  // i.e. users/predictions from user database and
  // football fixtures/scores/results from football database
  useEffect(() => {
    const fetchData = async () => {
      console.log('App.jsx first useEffect called')

      // FOOTBALL DB FETCH CALLS
      let apiUrl = 'http://127.0.0.1:8002';

      try {
          // const apiUrl = import.meta.env.VITE_API_URL;

          const result = await fetch(`${apiUrl}/competitions/`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `null`
              }
          });
          const competitions = await result.json();
          setCompetitions(competitions);
          // Sets the first element of competitions[0]
          // i.e. "Premier League" as the default competition
          // setSelectedCompetition(competitions['0']);
          setSelectedCompetition((prevComp) => ({...prevComp}));
      } catch (error) {
          console.error(error.message);
      };
      try {
        // const apiUrl = import.meta.env.VITE_API_URL;
        // const apiUrl = 'http://127.0.0.1:8002';
        const fixtures = await fetch(`${apiUrl}/fixtures/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `null`
          }
        });
        const fixtureData = await fixtures.json();
        setFixtures(fixtureData);
      } catch (error) {
        console.error(error.message);
      };
      try {
        // const apiUrl = import.meta.env.VITE_API_URL;
        // const apiUrl = 'http://127.0.0.1:8002';
        const results = await fetch(`${apiUrl}/results/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `null`
          }
        });
        const resultsData = await results.json();
        setResults(resultsData);
      } catch (error) {
        console.error(error.message);
      };


      // USER DB FETCH CALLS
      apiUrl = 'http://127.0.0.1:8005';
      try {
          // const apiUrl = import.meta.env.VITE_API_URL;
          // const apiUrl = 'http://127.0.0.1:8005';
          const result = await fetch(`${apiUrl}/user/`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `null`
              }
          });
          const users = await result.json();
          setUsers(users);
      } catch (error) {
          console.error(error.message);
      };
      try {
        const result = await fetch(`${apiUrl}/predictions/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `null`
        }
      });
        const predictions = await result.json();
        setAllPredictions(predictions);
      } catch (error) {
          console.error(error.message);
      };
      try {
        const result = await fetch(`${apiUrl}/userscores/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `null`
          }
        });
        const userScores = await result.json();
        setAllUserScores(userScores);
      } catch (error) {
          console.error(error.message);
      };

    }
    fetchData();
  }, [setAllPredictions, setAllUserScores, setCompetitions, setFixtures, setResults, setSelectedCompetition, setUsers]);


// Separate effect for fetching predictions info since it is dependent upon selectedCompetition
// and will need to be called each time the competition changes
// This effect also fetches userScores for selected competition
useEffect(() => {
  const fetchData = async () => {
    console.log('App.jsx second useEffect called')
    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = 'http://127.0.0.1:8005';
    try {
      const result = await fetch(`${apiUrl}/predictions/competition/${selectedCompetition.id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `null`
      }
    });
      const selectedCompPredictions = await result.json();
      setAllPredictions(selectedCompPredictions);
    } catch (error) {
        console.error(error.message);
    };
    try {
      const result = await fetch(`${apiUrl}/userscores/competition/${selectedCompetition.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `null`
        }
      });
      const selectedCompUserScores = await result.json();
      setAllUserScores(selectedCompUserScores);
    } catch (error) {
        console.error(error.message);
    };

  };
  if (selectedCompetition?.id) {
    // fetchData();
    console.log(selectedCompetition?.name)
    // setSelectedCompetition(prevComp => )
  }
}, [setAllPredictions, setAllUserScores, selectedCompetition?.id, selectedCompetition?.name]);


  return (
    <>
       <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Homepage> <CompetitionSelection/></Homepage>} />
            <Route path='/play' element={
              <Play setCompRound={setRound}>
                <GameWeekSelect setCompRound={setRound}  />
              </Play>}
            />
            <Route path='/viewfixtures' element={<Play setCompRound={setRound} />} />
            <Route path='/fixtures' element={<Fixtures round={round}/>} />
            <Route path='/predictions' element={<DisplayFixtures />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
