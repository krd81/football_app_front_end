function Prediction ({ match, isEdit, predictionsList, updatePrediction, awayPrediction, onDelete }) {
    const m = match;
    const predictions = predictionsList;

    // Returns the number of goals predicted for the home team
    // Returns null if no prediction is found
    const getHomePrediction = (fixture) => {
        const prediction = predictions.find(pred => pred.fixture_id === fixture.fixture_id);
        return prediction ? prediction.homePrediction : '';
    };

    // Returns the number of goals predicted for the away team
    // Returns null if no prediction is found
    const getAwayPrediction = (fixture) => {
        const prediction = predictions.find(pred => pred.fixture_id === fixture.fixture_id);
        return prediction ? prediction.awayPrediction : '';
    };

    // Returns the prediction object for the specific match or null if no prediction is found
    const getPrediction = (fixture) => {
        const prediction = predictions.find(pred => pred.fixture_id === fixture.fixture_id);
        if (prediction) {
            console.log(prediction)
        };
        return prediction || null;
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
                        value={getHomePrediction(m) >=0 ? getHomePrediction(m) : '0'}
                        onChange={e => {
                            const prediction = getPrediction(m);
                            // Check whether the new prediction means predicted outcome is
                            // home win, away win or draw
                            let newOutcomePrediction = 'X';
                            if (prediction?.awayPrediction > Number(e.target.value)) {
                                newOutcomePrediction = '2';
                            } else if (prediction?.awayPrediction < Number(e.target.value)) {
                                newOutcomePrediction = '1';
                            };

                            // Store changed prediction and updated outcome into
                            // predictions away using reducer
                            updatePrediction({
                                ...prediction,
                                homePrediction: Number(e.target.value),
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
                        value={getAwayPrediction(m) >=0 ? getAwayPrediction(m) : '0'}
                        onChange={e => {
                            const prediction = getPrediction(m);
                            // Check whether the new prediction means predicted outcome is
                            // home win, away win or draw
                            let newOutcomePrediction = 'X';
                            if (prediction?.homePrediction > Number(e.target.value)) {
                                newOutcomePrediction = '1';
                            } else if (prediction?.homePrediction < Number(e.target.value)) {
                                newOutcomePrediction = '2';
                            };

                            // Store changed prediction and updated outcome into
                            // predictions away using reducer
                            updatePrediction({
                                ...prediction,
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
                            <span className='numeric-value'>{`${getHomePrediction(m) >=0 ? getHomePrediction(m) : '0'}`}</span>
                        </span>
                        <span className='dash'>&ensp;&mdash;&ensp;</span>
                        <span className='prediction-disc'>
                            <span className='numeric-value'>{`${getAwayPrediction(m) >=0 ? getAwayPrediction(m) : '0'}`}</span>
                        </span>
                    </div>
                    </>
                )}
            </div>
        </>
    )
};

export default Prediction;
