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
    // let sortedRounds = useRef([]);


    for (let fixture in fixtures) {
        for (let matchElement in fixtures[fixture]) {
            if (matchElement === 'round' &&
                !(rounds.includes(fixtures[fixture][matchElement]))) {
                setRounds([...rounds, fixtures[fixture][matchElement]]);
            }
        }
    }

    // points.sort(function(a, b){return a - b});
    // const sortRounds = () => {
        // const sortedArray = rounds.sort();
        // setRounds(sortedArray);
        // sortedRounds.current = sortedArray;
        // console.log(sortedRounds.current);
    // }


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