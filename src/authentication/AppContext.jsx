import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([]);
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
                setCurrentUser(users);
            } catch (error) {
                console.error(error.message);
            }
        }
    fetchData();
    }, []);

    const login = (newToken) => {
        sessionStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        sessionStorage.removeItem('token')
        setToken(null)
    }


    return (
        <AppContext.Provider
        value={({
            user: [currentUser, setCurrentUser],
            userToken: [token, setToken],
            login,
            logout
            })}
        >
            { children }
        </AppContext.Provider>
    )

}