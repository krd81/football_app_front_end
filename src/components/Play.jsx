import '../css/app.css'
import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from '../authentication/AppContext'
import { CompRoundContext } from '../common/CompRoundContext';
import GameWeekSelect from './GameWeekSelect';

//'/competition/:comp_id/round/:round_id'

function Play ({ children, setCompRound, setRoutePath, route }) {
    const { fixtures, selectedCompetition } = useContext(AppContext);

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
            <CompRoundContext.Provider value={{ rounds }}
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