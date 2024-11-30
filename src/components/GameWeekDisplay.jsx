import { useContext} from 'react'
import '../css/Scores.css'
import Play from './Play';
import GameWeekSelect from './GameWeekSelect';
import { AppContext } from '../authentication/AppContext';


const GameWeekSelection = () => {
    const { selectedCompetition } = useContext(AppContext);

    return (
        <>
            <Play>
                <div>
                    <h1>{selectedCompetition.name}</h1>
                    <h2>Select round:</h2>
                </div>
                <GameWeekSelect />
            </Play>
        </>
    )
}

export default GameWeekSelection;