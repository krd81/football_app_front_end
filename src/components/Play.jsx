import '../css/app.css'
import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from '../contexts/AppContext'
import { CompRoundContext } from '../contexts/CompRoundContext';
import GameWeekSelect from '../pages/GameWeekSelect';

//'/competition/:comp_id/round/:round_id'

function Play ({ children, setCompRound, setRoutePath, route }) {
    const { fixtures, selectedCompetition } = useContext(AppContext);

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
            <CompRoundContext.Provider value={{ rounds }}
            >
                {children}
                <GameWeekDisplay comp={selectedCompetition.name}/>
                <GameWeekSelect setCompRound={setCompRound} route={route}/>
            </CompRoundContext.Provider>
        </>
    )
};

function GameWeekDisplay ({ comp }) {
    return (
        <>
            <div>
                <h1>{comp}</h1>
                <h2>Select round:</h2>
            </div>
        </>
    )
};


export default Play;