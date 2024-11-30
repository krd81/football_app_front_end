import '../css/app.css'
import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppContext } from '../authentication/AppContext'
import { CompRoundContext } from '../common/CompRoundContext';


function Play ({ children }) {
    const { fixtures } = useContext(AppContext);
    const [rounds, setRounds] = useState([]);
    const [selectedRound, setSelectedRound] = useState([]);


    for (let fixture in fixtures) {
        for (let matchElement in fixtures[fixture]) {
            if (matchElement === 'round' &&
                !(rounds.includes(fixtures[fixture][matchElement]))) {
                setRounds([...rounds, fixtures[fixture][matchElement]]);
            }
        }
    }


    const setRound = (round) => {
        setSelectedRound(round);
    }

    return (
        <>
            <CompRoundContext.Provider value={({
                rounds,
                selectedRound,
                setRound
                })}
            >
                {children}
            </CompRoundContext.Provider>
        </>
    )

}

export default Play;