import { useState } from "react";
import { AppContext } from "./AppContext";
import TokenDecoder from '../authentication/TokenDecoder';

const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(() => {
      const savedUser = sessionStorage.getItem('currentUser');
      return savedUser === "undefined" ? {} : JSON.parse(savedUser);
    });
    const [competitions, setCompetitions] = useState([]);
    // const [selectedCompetition, setSelectedCompetition] = useState({ id: 2, tier: 1, isCup: false, isLeague: true, hasGroups: false, active: true, name: 'Premier League', nationalTeamsOnly: false });
    const [selectedCompetition, setSelectedCompetition] = useState({});
    const [fixtures, setFixtures] = useState([]);
    const [results, setResults] = useState([]);
    const [allPredictions, setAllPredictions] = useState({});
    const [userPredictions, setUserPredictions] = useState({});
    const [allUserScores, setAllUserScores] = useState({});
    const [token, setToken] = useState(() => sessionStorage.getItem('token'));
    const [round, setRound] = useState('');


    function showDatabaseEntries () {
        console.log('App variables - login display')
        console.log(users)
        console.log(competitions)
        console.log(selectedCompetition)
        console.log(fixtures)
        console.log(results)
        console.log(allPredictions)
        console.log(allUserScores)
    };

    // Login function stores token. The current user is set in App.jsx
    const login = (newToken) => {
        sessionStorage.setItem('token', newToken)
        setToken(newToken)
        showDatabaseEntries()
    };


    const logout = () => {
        sessionStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
    };


    const value = {
        users, setUsers,
        currentUser, setCurrentUser,
        competitions, setCompetitions,
        selectedCompetition, setSelectedCompetition,
        fixtures, setFixtures,
        results, setResults,
        allPredictions, setAllPredictions,
        userPredictions, setUserPredictions,
        allUserScores, setAllUserScores,
        round, setRound,
        token,
        login,
        logout,
    };

    return  <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>

};

export default AppProvider;