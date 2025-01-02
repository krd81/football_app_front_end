import '../css/app.css'
import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
// import { CompRoundContext } from '../common/CompRoundContext';
import NavBar from './NavBar'
import Login from '../pages/Login'
import Homepage from '../pages/Homepage'
import Play from './Play'
import Fixtures from '../pages/Fixtures'
import DisplayFixtures from '../pages/DisplayFixtures'
import TokenDecoder from '../authentication/TokenDecoder'
import CompetitionSelection from './CompetitionSelection';
import GameWeekSelect from '../pages/GameWeekSelect';
import FixtureList from './FixtureList';
import Prediction from './Prediction';
import FinalScore from './FinalScore';
import PredictionOutcome from './PredictionOutcome';
import { UserTotalPoints } from './UserTotalPoints';
import FixtureHeading from './FixtureHeading';

function App({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState({ id: 2, tier: 1, isCup: false, isLeague: true, hasGroups: false, active: true, name: 'Premier League', nationalTeamsOnly: false });
  const [fixtures, setFixtures] = useState([]);
  const [results, setResults] = useState([]);
  const [allPredictions, setAllPredictions] = useState({});
  const [allUserScores, setAllUserScores] = useState({});
  const [token, setToken] = useState(() => sessionStorage.getItem('token'));
  const [round, setRound] = useState('');
  const [route, setRoute] = useState(''); // Use to store whether to display predictions or fixtures


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
  }, []);


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
}, [selectedCompetition?.id, selectedCompetition?.name]);



// useEffect(() =>{
//   setSelectedCompetition((prevComp) => ({...prevComp}))
// }, []);



  function showDatabaseEntries () {
      console.log(users)
      // console.log(currentUser)
      console.log(competitions)
      console.log(selectedCompetition)
      console.log(fixtures)
      console.log(results)
      console.log(allPredictions)
      console.log(allUserScores)
      //console.log()

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
    console.log(selectedCompetition)
  }

  const setCompRound = (round) => {
    setRound(round);
    console.log(round);
  }

  const setPredictions = (predictions) => {
    setAllPredictions(predictions);
    console.log(allPredictions)
  }


  const setRoutePath = (path) => {
    setRoute(path);
  };

  useEffect(() => {
    if (token && users) {
      const decodedToken = TokenDecoder(token);
      const user = users.find(user => user._id === decodedToken._id);
      // console.log(user)
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
            setSelectedCompetition,
            allPredictions,
            setPredictions,
            allUserScores,
            setAllUserScores,
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
            <Route path='/' element={<Homepage> <CompetitionSelection/></Homepage>} />
            <Route path='/play' element={<Play setCompRound={setCompRound} setRoutePath={() => setRoutePath('play')} route={route}>
              <GameWeekSelect setCompRound={setCompRound} route={route} />
            </Play>} />
            <Route path='/viewfixtures' element={<Play setCompRound={setCompRound} setRoutePath={() => setRoutePath('fixtures')} route={route}/>} />
            <Route path='/fixtures' element={<Fixtures round={round}/>} />
            <Route path='/predictions' element={<DisplayFixtures />} />

          </Routes>
        </div>
      </BrowserRouter>
      </AppContext.Provider>

    </>
  )
}

export default App;
