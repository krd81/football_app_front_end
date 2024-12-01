import { useContext} from 'react'
import '../css/Scores.css'
import GameWeekSelect from './GameWeekSelect';
import { AppContext } from '../authentication/AppContext';


const GameWeekDisplay = () => {
    const { selectedCompetition } = useContext(AppContext);

    return (
        <>
            <div>
                <h1>{selectedCompetition.name}</h1>
                <h2>Select round:</h2>
            </div>
            <GameWeekSelect />
        </>
    )
}

export default GameWeekDisplay;