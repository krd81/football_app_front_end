import { useState } from "react";
import { AppContext } from "./AppContext";
import TokenDecoder from "../utils/TokenDecoder"; // Adjust the import path as necessary

export const AppProvider = ({ children }) => {
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
    };

    const login = (newToken) => {
        sessionStorage.setItem('token', newToken)
        setToken(newToken)
        const decodedToken = TokenDecoder(newToken);
        const user = users.find(user => user._id === decodedToken._id);
        if (token && currentUser) {
            setCurrentUser(user);
        };
        // user ? setCurrentUser(user) : setCurrentUser(null);
        showDatabaseEntries()
    };


    const logout = () => {
        sessionStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
    };

    // Is this necessary?
    // useEffect(() => {
    // if (token && users) {
    //     const decodedToken = TokenDecoder(token);
    //     const user = users.find(user => user._id === decodedToken._id);
    //     console.log(user)
    //     setCurrentUser(user);
    //     sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    // }
    // }, [token, users, currentUser]);

    const value = {
        users, setUsers,
        currentUser, setCurrentUser,
        competitions, setCompetitions,
        selectedCompetition, setSelectedCompetition,
        fixtures, setFixtures,
        results, setResults,
        allPredictions, setAllPredictions,
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
