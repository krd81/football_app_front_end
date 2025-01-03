import '../css/app.css'
import { useContext, useMemo } from "react";
import useApp from '../hooks/useApp'
import { CompRoundContext } from '../contexts/CompRoundContext';


function Play ({ children }) {
    const { fixtures, selectedCompetition } = useApp();

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
            <CompRoundContext.Provider value={{ rounds }}>
                <GameWeekDisplay comp={selectedCompetition.name}/>
                    {children}

            </CompRoundContext.Provider>
        </>
    )
};

function GameWeekDisplay ({ comp }) {
    const { selectedCompetition } = useContext(AppContext);
    const compName = selectedCompetition.name;

    return (
        <>
            <div>
                <h1>{comp}</h1>
                <h1>{compName}</h1>
                <h2>Select round:</h2>
            </div>
        </>
    )
};


export default Play;