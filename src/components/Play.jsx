import '../css/app.css'
import { useContext, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../authentication/AppContext'
import { CompRoundContext } from '../common/CompRoundContext';
import GameWeekSelect from './GameWeekSelect';


function Play ({ children, setCompRound }) {
    const { round, fixtures, selectedCompetition } = useContext(AppContext);
    const [rounds, setRounds] = useState([]);
    let sortedRounds = useRef([]);
    const nav = useNavigate();


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


    const showPredictionsComponent = () => {
        console.log(round);
        nav('/predictions');
    }



    return (
        <>
            <CompRoundContext.Provider value={({
                rounds
                })}
            >
                {children}
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