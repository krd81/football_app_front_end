import '../css/app.css'
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from '../authentication/AppContext';
// import { CompRoundContext } from '../common/CompRoundContext';
import NavBar from './NavBar'
import Login from './Login'
import Homepage from './Homepage'
import Play from './Play'
import Fixtures from './Fixtures'
import Predictions from './Predictions'
import TokenDecoder from '../authentication/TokenDecoder'

function App({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState({});
  const [fixtures, setFixtures] = useState([]);
  const [results, setResults] = useState([]);
  const [allPredictions, setAllPredictions] = useState({});
  const [token, setToken] = useState(() => sessionStorage.getItem('token'));
  const [round, setRound] = useState('');
  const [route, setRoute] = useState(''); // Use to store whether to display predictions or fixtures


  // Fetch call to manage all external data required for the app
  // i.e. users/predictions from user database and
  // football fixtures/scores/results from football database
  useEffect(() => {
    const fetchData = async () => {
      try {
          // const apiUrl = import.meta.env.VITE_API_URL;
          const apiUrl = 'http://127.0.0.1:8005';
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
          // const apiUrl = import.meta.env.VITE_API_URL;
          const apiUrl = 'http://127.0.0.1:8002';
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
          setSelectedCompetition(competitions['0']);
      } catch (error) {
          console.error(error.message);
      };
      try {
        // const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrl = 'http://127.0.0.1:8002';
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
        const apiUrl = 'http://127.0.0.1:8002';
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
    }
    fetchData();
  }, []);


// Separate effect for fetching predictions info since it is dependent upon selectedCompetition
// and will need to be called each time the competition changes
useEffect(() => {
  const fetchData = async () => {
      try {
        // const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrl = 'http://127.0.0.1:8005';
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
      }
  };
  if (selectedCompetition.id) {
    fetchData();
  }
}, [selectedCompetition.id]);



  function showDatabaseEntries () {
      console.log(users)
      // console.log(currentUser)
      console.log(competitions)
      console.log(selectedCompetition)
      console.log(fixtures)
      console.log(results)
      console.log("Fixtures data type: " + typeof(fixtures))

  }

  const login = (newToken) => {
      sessionStorage.setItem('token', newToken)
      setToken(newToken)
      const decodedToken = TokenDecoder(newToken);
      const user = users.find(user => user._id === decodedToken._id);
      // console.log(user)
      // setCurrentUser(user);
      // user ? setCurrentUser(user) : setCurrentUser(null);
      showDatabaseEntries()
  }

  const logout = () => {
      sessionStorage.removeItem('token');
      setToken(null);
      setCurrentUser(null);
  }

  const setComp = (comp) => {
    setSelectedCompetition(comp);
  }

  const setCompRound = (round) => {
    setRound(round);
    console.log(round);
  }


  const setRoutePath = (path) => {
    setRoute(path);
  };

  useEffect(() => {
    if (token && users) {
      const decodedToken = TokenDecoder(token);
      const user = users.find(user => user._id === decodedToken._id);
      console.log(user)
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
 }, [token, users, currentUser]);


  return (
    <>
     <AppContext.Provider
        value={({
            // user: [currentUser, setCurrentUser],
            currentUser,
            comps: [competitions, setCompetitions],
            userToken: [token, setToken],
            comp: [selectedCompetition, setSelectedCompetition],
            competitions,
            selectedCompetition,
            allPredictions,
            setAllPredictions,
            fixtures,
            results,
            round,
            login,
            logout,
            setComp
            })}
            >
              {children}
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Homepage />} />
            <Route path='/play' element={<Play setCompRound={setCompRound} setRoutePath={() => setRoutePath('play')} route={route}/>} />
            <Route path='/viewfixtures' element={<Play setCompRound={setCompRound} setRoutePath={() => setRoutePath('fixtures')} route={route}/>} />
            <Route path='/fixtures' element={<Fixtures round={round}/>} />
            <Route path='/predictions' element={<Predictions round={round}/>} />

          </Routes>
        </div>
      </BrowserRouter>
      </AppContext.Provider>

    </>
  )
}

export default App;
