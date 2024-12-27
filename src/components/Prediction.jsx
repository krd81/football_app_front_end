function Prediction ({
    match,
    isEdit,
    predictionsList,
    updatePrediction,
    home,
    away,
    prediction
}) {
    const m = match;



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
                        value={home >=0 ? home : '0'}
                        onChange={e => {
                            const currentPrediction = prediction;
                            // Check whether the new prediction means predicted outcome is
                            // home win, away win or draw
                            let newOutcomePrediction = 'X';
                            if (away > Number(e.target.value)) {
                                newOutcomePrediction = '2';
                            } else if (away < Number(e.target.value)) {
                                newOutcomePrediction = '1';
                            };

                            // Store changed prediction and updated outcome into
                            // predictions away using reducer
                            updatePrediction({
                                ...currentPrediction,
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
                        value={away >=0 ? away : '0'}
                        onChange={e => {
                            const currentPrediction = prediction;
                            // Check whether the new prediction means predicted outcome is
                            // home win, away win or draw
                            let newOutcomePrediction = 'X';
                            if (home > Number(e.target.value)) {
                                newOutcomePrediction = '1';
                            } else if (home < Number(e.target.value)) {
                                newOutcomePrediction = '2';
                            };

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
                            <span className='numeric-value'>{`${home >=0 ? home : '0'}`}</span>
                        </span>
                        <span className='dash'>&ensp;&mdash;&ensp;</span>
                        <span className='prediction-disc'>
                            <span className='numeric-value'>{`${away >=0 ? away : '0'}`}</span>
                        </span>
                    </div>
                    </>
                )}
            </div>
        </>
    )
};

export default Prediction;
