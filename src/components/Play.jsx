import '../css/app.css'
import { useMemo } from "react";
import useApp from '../hooks/useApp'
import { CompRoundContext } from '../contexts/CompRoundContext';


function Play ({ children }) {
    const { fixtures, selectedCompetition } = useApp();
    console.log(`Selected competition (Play): ${selectedCompetition.id}`)


    const rounds = useMemo(() => {
        console.log('Play useMemo called')
        const compFixtures = [];
        for (let fixture in fixtures) {
            for (let matchElement in fixtures[fixture]) {
                if (matchElement === 'competitionId') {
                    if (fixtures[fixture][matchElement] === selectedCompetition.id) {
                        compFixtures.push(fixtures[fixture]);
                    };
                };
            };
        };


        const newRounds = [];
        for (let fixture in compFixtures) {
            for (let matchElement in compFixtures[fixture]) {
                if (matchElement === 'round' && !newRounds.includes(compFixtures[fixture][matchElement])) {
                    newRounds.push(compFixtures[fixture][matchElement]);
                }
            }
        }
        // Sort round numbers alpha/numerically
        return newRounds.sort((a, b) => a - b);

    }, [fixtures, selectedCompetition.id]);



    return (
        <>
            <CompRoundContext.Provider value={{ rounds }}>
                <GameWeekDisplay />
                    {children}

            </CompRoundContext.Provider>
        </>
    )
};

function GameWeekDisplay () {
    const { selectedCompetition } = useApp();
    const compName = selectedCompetition.name;

    return (
        <>
            <div>
                <h1>{compName}</h1>
                <h2>Select round:</h2>
            </div>
        </>
    )
};


export default Play;