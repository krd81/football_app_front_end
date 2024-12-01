import '../css/app.css'
import { useContext, useState, useRef } from "react";
import { AppContext } from '../authentication/AppContext'
import { CompRoundContext } from '../common/CompRoundContext';
// import GameWeekDisplay from './GameWeekDisplay';
import GameWeekSelect from './GameWeekSelect';


function Play ({ children }) {
    const { fixtures, selectedCompetition } = useContext(AppContext);
    const [rounds, setRounds] = useState([]);
    const [selectedRound, setSelectedRound] = useState([]);
    let sortedRounds = useRef([]);


    for (let fixture in fixtures) {
        for (let matchElement in fixtures[fixture]) {
            if (matchElement === 'round' &&
                !(rounds.includes(fixtures[fixture][matchElement]))) {
                setRounds([...rounds, fixtures[fixture][matchElement]]);
            }
        }
    }

    // Sort round numbers numerically
    const sortedArray = rounds.sort();
    sortedRounds.current = sortedArray;




    const setRound = (round) => {
        setSelectedRound(round);
    }

    return (
        <>
            <CompRoundContext.Provider value={({
                rounds,
                selectedRound,
                // sortedRounds,
                setRound
                })}
            >
                {children}
                <GameWeekDisplay comp={selectedCompetition.name}/>
                <GameWeekSelect />
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