import '../css/app.css'
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppContext } from '../authentication/AppContext'
import NavBar from './NavBar'
import Login from './Login'
import Homepage from './Homepage'
import Play from './Play'
import Fixtures from './Fixtures'
import Predictions from './Predictions'
import TokenDecoder from '../authentication/TokenDecoder'

function App({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState({});
  const [fixtures, setFixtures] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [token, setToken] = useState(null);

  // Fetch call to manage all external data required for the app
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
          }
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
          }
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
            setFixtures(fixtureData);
          } catch (error) {
            console.error(error.message);
          }

      }
  fetchData();

}, []);



  function showDatabaseEntries () {
      console.log(users)
      console.log(currentUser)
      console.log(competitions)
      console.log(selectedCompetition)
      console.log(fixtures)
      console.log("Fixtures data type: " + typeof(fixtures))

  }

  const login = (newToken) => {
      sessionStorage.setItem('token', newToken)
      setToken(newToken)
      const decodedToken = TokenDecoder(newToken);
      const user = users.find(user => user._id === decodedToken._id);
      console.log(user)
      setCurrentUser(user);
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


    let tempRounds = [];
    if (fixtures) {
      for (let fixture in fixtures) {
        for (let matchElement in fixtures[fixture]) {
            if (matchElement === 'round' &&
                !(rounds.includes(fixtures[fixture][matchElement]))) {
                setRounds([...rounds, fixtures[fixture][matchElement]]);
            }
        }
      }
    }

  }

  function setupRounds () {

  }


  return (
    <>
     <AppContext.Provider
        value={({
            user: [currentUser, setCurrentUser],
            comps: [competitions, setCompetitions],
            userToken: [token, setToken],
            comp: [selectedCompetition, setSelectedCompetition],
            competitions,
            selectedCompetition,
            fixtures,
            login,
            logout,
            setComp
            })}
            >
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Homepage />} />
            <Route path='/play' element={<Play />} />
            <Route path='/fixtures' element={<Fixtures />} />
            <Route path='/predictions' element={<Predictions />} />

          </Routes>
        </div>
      </BrowserRouter>
      </AppContext.Provider>

    </>
  )
}

export default App;
