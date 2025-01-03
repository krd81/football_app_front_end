import useApp from '../hooks/useApp'

function Prediction ({
    match,
    isEdit,
    updatePrediction,
    prediction
}) {
    const { currentUser } = useApp();
    const m = match;
    let currentPrediction;

    // If no prediction exists, create a new one, assuming
    // initial prediction is 0-0
    // Save to DB
    if (prediction == null) {
        currentPrediction = {
            competitionId: m.competitionId,
            round: m.round,
            groupId: m.groupId,
            fixture_id: m.fixture_id,
            homeName: m.homeName,
            awayName: m.awayName,
            homePrediction: 0,
            awayPrediction: 0,
            outcomePrediction: 'X',
            user: currentUser
        };
        saveNewPrediction();
    } else {
        currentPrediction = prediction;
    };

    async function saveNewPrediction () {
        const apiUrl = 'http://127.0.0.1:8005/predictions/';
        const method = 'POST';

        try {
            await fetch(apiUrl, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(currentPrediction),
            });
        } catch (error) {
            console.error('Failed to create new prediction:', error);
        };
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
                        // value={home >=0 ? home : '0'}
                        value={currentPrediction.homePrediction}
                        onChange={e => {
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
                                awayPrediction: newAwayPrediction,
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
