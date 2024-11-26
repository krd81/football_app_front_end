import { createContext, useState, useEffect } from "react";
import TokenDecoder from './TokenDecoder'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [competitions, setCompetitions] = useState([]);
    const [selectedCompetition, setSelectedCompetition] = useState({});
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
                setSelectedCompetition(competitions[0][0]);
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
        setCompetitions(comp);
    }



    return (
        <AppContext.Provider
        value={({
            user: [currentUser, setCurrentUser],
            competitions: [competitions, setCompetitions],
            userToken: [token, setToken],
            competition: [selectedCompetition, setSelectedCompetition],
            login,
            logout,
            setComp
            })}
        >
            { children }
        </AppContext.Provider>
    )

}