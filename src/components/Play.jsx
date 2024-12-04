import '../css/app.css'
import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from '../authentication/AppContext'
import { CompRoundContext } from '../common/CompRoundContext';
import GameWeekSelect from './GameWeekSelect';


function Play ({ setCompRound }) {
    const { fixtures, selectedCompetition } = useContext(AppContext);
    const [rounds, setRounds] = useState([]);


    useEffect(() => {
        const newRounds = [];
        for (let fixture in fixtures) {
            for (let matchElement in fixtures[fixture]) {
                if (matchElement === 'round' && !newRounds.includes(fixtures[fixture][matchElement])) {
                    newRounds.push(fixtures[fixture][matchElement]);
                }
            }
        }
        setRounds(newRounds);
    }, [fixtures]);


    // Sort round numbers numerically
    // const sortedArray = rounds.sort();
    // sortedRounds.current = sortedArray;

    const sortedRounds = useMemo(() => {
        return rounds.sort((a, b) => a - b);
    }, [rounds]);



    return (
        <>
            <CompRoundContext.Provider value={{
                rounds: sortedRounds
                }}
            >
                <GameWeekDisplay comp={selectedCompetition.name}/>
                <GameWeekSelect setCompRound={setCompRound}/>
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