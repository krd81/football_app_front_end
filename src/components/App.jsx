import '../css/App.css'
import { useEffect } from "react";
import { useQuery } from 'react-query';
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
import { getUserPredictions } from '../functions/getPredictions.jsx';
import { getUserScores } from '../functions/getScores.jsx';

function App() {
  const {currentUser, setCurrentUser, setCompetitions, selectedCompetition, setSelectedCompetition, setFixtures, setResults, setUsers, setUserPredictions, setUserScores, token, round, setRound} = useApp();

  // Fetch calls to manage all external data required for the app
  // i.e. users/predictions from user database and
  // football fixtures/scores/results from football database

  const fetchUsers = async () => {
    console.log('Fetch All Users called')
    const apiUrl = import.meta.env.VITE_API_URL_USER_DB;
    const response = await fetch(`${apiUrl}/user/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `null`
        }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    };

    return response.json();
  };

  const fetchUserData = async (userId) => {
    console.log('Fetch UserData called')
    const [predictions, scores] = await Promise.all([
      getUserPredictions(userId),
      getUserScores(userId),
    ]);
    return { predictions, scores };
  };

  const fetchCompetitions = async () => {
    console.log('Fetch Competitions called')
    const apiUrl = import.meta.env.VITE_API_URL_FB_DB;
    const response = await fetch(`${apiUrl}/competitions/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `null`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    };
    return response.json();
  };


  const fetchFixtureData = async () => {
    console.log('Fetch FixtureData called')
    const apiUrl = import.meta.env.VITE_API_URL_FB_DB;
    const response = await fetch(`${apiUrl}/fixtures/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `null`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    };
    return response.json();

  };


  const fetchResultsData = async () => {
    console.log('Fetch ResultsData called')
    const apiUrl = import.meta.env.VITE_API_URL_FB_DB;
    const response = await fetch(`${apiUrl}/results/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `null`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    };
    return response.json();
  };



  const { data: allUsers, isLoading: isUsersLoading } = useQuery(
    'users',
    fetchUsers
  );

  useEffect(() => {
    console.log('All users useEffect called');
    if (allUsers) {
      setUsers(allUsers);
    };
  }, [allUsers, setUsers]);



  const { data: userData, isLoading: isUserDataLoading } = useQuery(
    ['userData', currentUser?._id],
    () => fetchUserData(currentUser._id),
    { enabled: !!currentUser }
  );

  useEffect(() => {
    console.log('User data useEffect called');
    if (userData) {
      setUserPredictions(userData.predictions);
      setUserScores(userData.scores);
    }
  }, [userData, setUserPredictions, setUserScores]);



  const { data: competitions, isLoading: isCompetitionsLoading } = useQuery(
    'competitions',
    fetchCompetitions
  );

  useEffect(() => {
    if (competitions) {
      setCompetitions(competitions);

      const premierLeague = competitions.find(comp => comp.name === 'Premier League');

      // Sets the first element of competitions[0]
      // i.e. "Premier League" as the default competition
      if (!selectedCompetition.name) {
        setSelectedCompetition(premierLeague);
      };
    };
    console.log(`Selected competition (App): ${selectedCompetition.name}`)

  }, [competitions, setCompetitions, setSelectedCompetition, selectedCompetition.name]);



  const { data: fixtures, isLoading: isFixturesLoading } = useQuery(
    'fixtureData',
    fetchFixtureData
  );

  useEffect(() => {
    console.log('Fixtures useEffect called');
    if(fixtures) {
      setFixtures(fixtures);
    };
  }, [fixtures, setFixtures]);



  const { data: results, isLoading: isResultsLoading } = useQuery(
    'resultsData',
    fetchResultsData
  );

  useEffect(() => {
    console.log(' useEffect called');
    if(results) {
      setResults(results);
    };

  }, [results, setResults]);


  useEffect(() => {
    console.log('Current user/predictions/scores useEffect called');

    if (token && allUsers) {
      const decodedToken = TokenDecoder(token);

      const user = allUsers.find(user => user._id === decodedToken._id);
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      console.log(JSON.stringify(user));
    };
  }, [allUsers, token, setCurrentUser]);




  if (isUserDataLoading || isCompetitionsLoading || isUsersLoading || isFixturesLoading || isResultsLoading) {
    return <div>Loading...</div>;
  }



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
