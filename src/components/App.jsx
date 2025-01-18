import '../css/App.css'
import { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useApp from '../hooks/useApp'
import TokenDecoder from '../authentication/TokenDecoder'
import NavBar from './NavBar'
import Login from '../pages/Login'
import Homepage from '../pages/Homepage'
import Play from './Play'
import Fixtures from '../pages/Fixtures'
import DisplayFixtures from '../pages/DisplayFixtures'
import CompetitionSelection from './CompetitionSelection';
import GameWeekSelect from '../pages/GameWeekSelect';
import { getPredictions } from '../functions/getPredictions.jsx';

function App() {
  const {currentUser, setCurrentUser, setCompetitions, selectedCompetition, setSelectedCompetition, setFixtures, setResults, users, setUsers, setAllUserScores, allPredictions, setAllPredictions, setUserPredictions, token, round, setRound} = useApp();
  const predictions = allPredictions;

  // Fetch calls to manage all external data required for the app
  // i.e. users/predictions from user database and
  // football fixtures/scores/results from football database
  useEffect(() => {
    console.log('Set Users useEffect called')
    const fetchData = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
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
    };
    fetchData();
  }, [setUsers]);


  useEffect(() => {
    async function updateAllPredictions() {
      console.log('Predictions useEffect called')
      const fetchedPredictions = await getPredictions();
      setAllPredictions(fetchedPredictions);
    }
    updateAllPredictions();
  }, [setAllPredictions]);

  useEffect(() => {
      console.log('User Scores useEffect called')
      const fetchData = async () => {
          try {
                const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
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
      fetchData();
  }, [setAllUserScores, selectedCompetition.id]);

  useEffect(() => {
      console.log('Competitions useEffect called')

          const fetchData = async () => {
          try {
            const apiUrl = import.meta.env.VITE_API_URL_FB_DB;

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
            if (!selectedCompetition.name) {
              setSelectedCompetition(competitions['0']);
            };
            console.log(`Selected competition (App): ${selectedCompetition.name}`)

          } catch (error) {
              console.error(error.message);
          };
      };
      fetchData();
  }, [setCompetitions, setSelectedCompetition, selectedCompetition.name]);

  useEffect(() => {
      console.log('Fixtures useEffect called')
      const fetchData = async () => {
          try {
          const apiUrl = import.meta.env.VITE_API_URL_FB_DB;
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
      };
      fetchData();
  }, [setFixtures]);

  useEffect(() => {
      console.log('Football Results useEffect called')
      const fetchData = async () => {
          try {
          const apiUrl = import.meta.env.VITE_API_URL_FB_DB;
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
      };
      fetchData();
  }, [setResults]);


  useMemo(() => {
    console.log('Current user/predictions useMemo called')
    if (token && users) {
        const decodedToken = TokenDecoder(token);
        const user = users.find(user => user._id === decodedToken._id);
        setCurrentUser(user);
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

        const filterPredictions = Array.isArray(allPredictions) ? allPredictions.filter(prediction => {
          return prediction.user && prediction.user._id === user._id;
        }) : Object.values(allPredictions).filter(prediction => {
          return prediction.user && prediction.user._id === user._id;
        });

        setUserPredictions(filterPredictions);
    }
  }, [token, users, currentUser, setCurrentUser, setUserPredictions, allPredictions]);


  return (
    <>
       <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/homepage' element={<Homepage> <CompetitionSelection/></Homepage>} />
          <Route path='/play/competition/:comp_id' element={
              <Play setCompRound={setRound}>
                <GameWeekSelect setCompRound={setRound}  />
              </Play>
              }
          />
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
