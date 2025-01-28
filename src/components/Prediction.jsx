import { useState } from 'react';
import useApp from '../hooks/useApp'

function Prediction ({
    match,
    isEdit,
    updatePrediction,
    home,
    away,
    prediction
}) {
    let { allPredictions, userPredictions, setUserPredictions, currentUser } = useApp();
    userPredictions = Array.isArray(userPredictions) ? userPredictions : [];
    const [isLocked, setIsLocked] = useState(false);
    const m = match;
    let currentPrediction = prediction;

    function hasPredictionsLoaded(predictions) {
        if (Array.isArray(predictions)) {
            return predictions.length > 0;
        } else {
            return Object.keys(predictions).length > 0;
        }
    };

    // if (!hasPredictionsLoaded(allPredictions) || !hasPredictionsLoaded(userPredictions)) {
    if (!hasPredictionsLoaded(userPredictions)) {
        return <div>Loading...</div>
    };


    const currentTime = Date.now();
    const matchStartTime = new Date(`${m.date}T${m.time}Z`);

    // Locks prediction 5 mins before match scheduled start time
    if ((currentTime - matchStartTime) > 300000) {
        setIsLocked(true);
    };

    return (
        <>
            <div className='grid-item2'>
                You predicted
            </div>
            <div className='grid-item3'>
                {isEdit ? (
                    <>
                    <input
                        className='score-input'
                        id={`${m.homeName}`}
                        name='homePrediction'
                        type='number'
                        size="1"
                        min="0"
                        max="10"
                        value={currentPrediction.homePrediction}
                        onChange={e => {
                            //if (isLocked) return; // Prevent changes if isLocked is true
                            // const currentPrediction = prediction || {}; // Initialize prediction if null
                            const newHomePrediction = Number(e.target.value);
                            // Check whether the new prediction means predicted outcome is
                            // home win, away win or draw
                            let newOutcomePrediction = 'X';
                            if (currentPrediction.awayPrediction > newHomePrediction) {
                                newOutcomePrediction = '2';
                            } else if (currentPrediction.awayPrediction < newHomePrediction) {
                                newOutcomePrediction = '1';
                            };
                            console.log(`Current prediction: ${JSON.stringify(currentPrediction)}`)
                            console.log(`Home prediction now: ${newHomePrediction} - Outcome prediction: ${newOutcomePrediction === 'X'? 'Draw' : newOutcomePrediction === '1' ? 'Home win' : 'Away win'}`)

                            // Store changed prediction and updated outcome into
                            // predictions away using reducer
                            updatePrediction({
                                ...currentPrediction,
                                homePrediction: newHomePrediction,
                                outcomePrediction: newOutcomePrediction
                            });
                        }}
                    />
                    &nbsp;&mdash;&nbsp;
                    <input
                        className='score-input'
                        id={`${m.awayName}`}
                        name='awayPrediction'
                        type='number'
                        size="1"
                        min="0"
                        max="10"
                        value={currentPrediction.awayPrediction}
                        onChange={e => {
                            //if (isLocked) return; // Prevent changes if isLocked is true
                            // const currentPrediction = prediction || {}; // Initialize prediction if null
                            const newAwayPrediction = Number(e.target.value);
                            // Check whether the new prediction means predicted outcome is
                            // home win, away win or draw
                            let newOutcomePrediction = 'X';
                            if (currentPrediction.homePrediction > newAwayPrediction) {
                                newOutcomePrediction = '1';
                            } else if (currentPrediction.homePrediction < newAwayPrediction) {
                                newOutcomePrediction = '2';
                            };
                            console.log(`Current prediction: ${JSON.stringify(currentPrediction)}`)
                            console.log(`Away prediction now: ${newAwayPrediction} - Outcome prediction: ${newOutcomePrediction === 'X'? 'Draw' : newOutcomePrediction === '1' ? 'Home win' : 'Away win'}`)

                            // Store changed prediction and updated outcome into
                            // predictions away using reducer
                            updatePrediction({
                                ...currentPrediction,
                                awayPrediction: Number(e.target.value),
                                outcomePrediction: newOutcomePrediction
                            });
                        }}

                    />
                    </>
                ) : (
                    <>
                    <div className='score-display'>
                        <span className='prediction-disc'>
                            <span className='numeric-value'>{`${currentPrediction.homePrediction}`}</span>
                        </span>
                        <span className='dash'>&ensp;&mdash;&ensp;</span>
                        <span className='prediction-disc'>
                            <span className='numeric-value'>{`${currentPrediction.awayPrediction}`}</span>
                        </span>
                    </div>
                    </>
                )}
            </div>
        </>
    )
};

export default Prediction;
