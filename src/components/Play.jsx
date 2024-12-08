import '../css/app.css'
import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from '../authentication/AppContext'
import { CompRoundContext } from '../common/CompRoundContext';
import GameWeekSelect from './GameWeekSelect';

//'/competition/:comp_id/round/:round_id'

function Play ({ children, setCompRound, setRoutePath, route }) {
    const { fixtures, selectedCompetition, round } = useContext(AppContext);
    const [predictions, setPredictions] = useState({});


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
              const roundPredictions = await result.json();
              setPredictions(roundPredictions);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, [round, selectedCompetition.id]);



    // Memoize the setRoutePath function
    const memoizedSetRoutePath = useMemo(() => {
        return () => setRoutePath();
    }, [setRoutePath]);

    // Call the memoized function
    memoizedSetRoutePath();


    function getRounds (fixtures) {
        const newRounds = [];
        for (let fixture in fixtures) {
            for (let matchElement in fixtures[fixture]) {
                if (matchElement === 'round' && !newRounds.includes(fixtures[fixture][matchElement])) {
                    newRounds.push(fixtures[fixture][matchElement]);
                }
            }
        }
        // Sort round numbers numerically
        return newRounds.sort((a, b) => a - b);
    }

    const rounds = useMemo(() => {
        return getRounds(fixtures);
    }, [fixtures]);




    return (
        <>
            <CompRoundContext.Provider value={{
                rounds,
                predictions
                }}
            >
                {children}
                <GameWeekDisplay comp={selectedCompetition.name}/>
                <GameWeekSelect setCompRound={setCompRound} route={route}/>
            </CompRoundContext.Provider>
        </>
    )
}

function GameWeekDisplay ({ comp }) {
    return (
        <>
            <div>
                <h1>{comp}</h1>
                <h2>Select round:</h2>
            </div>
        </>
    )
}


export default Play;