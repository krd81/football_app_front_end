import { Fragment, useContext } from 'react'
import { AppContext } from '../authentication/AppContext';
import PredictionOutcome from './PredictionOutcome';
import shortName from '../functions/nameAbbreviation';
import { timeFormatter } from '../functions/dateTimeFormatter'
import '../css/MatchCard.css'

export default function FixtureList({
    date,
    fixtures,
    matchResult,
    isEdit,
    predictions,
    updatePrediction,
    addAwayPrediction,
    onDeletePrediction
}) {
    const { round } = useContext(AppContext);
    const roundFixtures = fixtures;

    return (
    <>
        {roundFixtures?.map((match) => (
            match.date === date && (
                <Fragment key={match.fixture_id + date} >
                    <Fixture
                        round={round}
                        match={match}
                        isEdit={isEdit}
                        predictionsList={predictions}
                        updatePrediction={updatePrediction}
                        awayPrediction={addAwayPrediction}
                        onDelete={onDeletePrediction}
                        matchResult={matchResult}
                    />
                </Fragment>
        )
        ))}

    </>
  )
};


function Fixture ({ match, isEdit, predictionsList, updatePrediction, awayPrediction, onDelete }) {
    const { results, round } = useContext(AppContext);
    const m = match;
    const allResults = results;
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
        console.log(prediction)
        return prediction || null;
    };

    // Returns the actual score (string e.g. '3 - 2') or null if not found
    const getFinalScore = (fixture) => {
        const matchResult = allResults.find(result => result.fixture_id === fixture.fixture_id);
        const scoreObject = matchResult.scores;
        const score = scoreObject.score;

        return score || null;
    };

    // Number of goals scored by home team (actual)
    const getHomeScore = (fixture) => {
        const score = getFinalScore(fixture);

        if (score) {
            const homeScore = score ? parseInt(score.split(' - ')[0], 10) : null;
            return homeScore;
        }
    };

    // Number of goals scored by away team (actual)
    const getAwayScore = (fixture) => {
        const score = getFinalScore(fixture);

        if (score) {
            const awayScore = score ? parseInt(score.split(' - ')[1], 10) : null;
            return awayScore;
        }
    };

    // Final result is the actual outcome (home win, away win, draw)
    // Function returns null if no full time result exists
    const getFinalResult = (fixture) => {
        const matchResult = allResults.find(result => result.fixture_id === fixture.fixture_id);
        const resultObject = matchResult.outcomes;
        const result = resultObject.fullTime;

        return result || null;
    };


    // Match status indicates whether game is in play, not started or completed
    const matchStatusTag = (match_id) => {
        const result = allResults.find(result => result.fixture_id === match_id);
        const status = result?.status;

        switch (status) {
            case 'FINISHED': {
                return (
                    <>
                        <span className='ft-tag'>
                            Full time
                        </span>
                    </>
                )
            }
            case 'IN PLAY':
            case 'HALF TIME BREAK':
            case 'ADDED TIME':
            case 'INSUFFICIENT DATA': {
                return (
                    <span className='live-tag'>
                        Live
                    </span>

                )
            }
            default: {
                return (
                    <>
                        <span className='default-tag'>
                            Kick-off
                        </span>
                        <span className='time-tag'>
                           {timeFormatter(result?.scheduled) || timeFormatter(m?.time) ||'none'}
                        </span>
                    </>
                )
            }
        }
    };



    return (
        <>
        {console.log(predictions)}
            <div className='match-card'>
                <div className='card-content'>
                <div className='card-header-div'>
                    {matchStatusTag(m.fixture_id)}
                </div>
                <div className='predictions-text'>
                    <div className='grid-container'>
                        <div className='grid-item1'>
                            <label className='team-name' htmlFor='homePrediction'>{`${shortName(m.homeName)} `}</label>
                        </div>
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
                                        if (prediction.awayPrediction > Number(e.target.value)) {
                                            newOutcomePrediction = '2';
                                        } else if (prediction.awayPrediction < Number(e.target.value)) {
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
                                        if (prediction.homePrediction > Number(e.target.value)) {
                                            newOutcomePrediction = '1';
                                        } else if (prediction.homePrediction < Number(e.target.value)) {
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
                        <div className='grid-item4'>
                            Final Score

                        </div>
                        <div className='grid-item5'>
                            <div className='score-display'>
                                    <span className='result-disc'>
                                        <span className='numeric-value'>{`${getHomeScore(m) >=0 ? getHomeScore(m) : '0'}`}</span>
                                    </span>
                                    <span className='dash'>&ensp;&mdash;&ensp;</span>
                                    <span className='result-disc'>
                                        <span className='numeric-value'>{`${getAwayScore(m) >=0 ? getAwayScore(m) : '0'}`}</span>
                                    </span>
                            </div>
                        </div>
                        <div className='grid-item6'>
                                <label className='team-name' htmlFor='awayPrediction'>{` ${shortName(m.awayName)}`}</label>
                        </div>

                    </div>
                    <div className='outcome-div'>
                        <PredictionOutcome
                            finalScore={getFinalScore(m) || null}
                            predictedScore={`${getHomePrediction(m) || '0'} - ${getAwayPrediction(m) || '0'}`}
                            finalResult={getFinalResult(m) || null}
                            prediction={getPrediction(m) || null}
                        />
                    </div>
                </div>
                </div>
            </div>

        </>
    )
};
