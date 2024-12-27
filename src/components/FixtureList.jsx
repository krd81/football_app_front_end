import { Fragment, useContext } from 'react'
import { AppContext } from '../contexts/AppContext';
import { FixtureContext } from '../contexts/FixtureContext';
import FixtureHeading from './FixtureHeading'
import Prediction from './Prediction'
import FinalScore from './FinalScore'
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
                        // matchResult={matchResult}
                    />
                </Fragment>
        )
        ))}

    </>
  )
};


function Fixture ({ match, isEdit, predictionsList, updatePrediction, awayPrediction, onDelete }) {
    const { results } = useContext(AppContext);
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
        if (prediction) {
            console.log(prediction)
        };
        return prediction || null;
    };

    // Returns the actual score (string e.g. '3 - 2') or null if not found
    const getFinalScore = (fixture) => {
        const matchResult = allResults.find(result => result.fixture_id === fixture.fixture_id);
        const scoreObject = matchResult?.scores;
        const score = scoreObject?.score;

        return score || null;
    };



    // Final result is the actual outcome (home win, away win, draw)
    // Function returns null if no full time result exists
    const getFinalResult = (fixture) => {
        const matchResult = allResults.find(result => result.fixture_id === fixture.fixture_id);
        const resultObject = matchResult?.outcomes;
        const result = resultObject?.fullTime;

        return result || null;
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




    return (
        <>
        {console.log(predictions)}
        <FixtureContext.Provider>
            <div className='match-card'>
                <div className='card-content'>
                <div className='card-header-div'>
                    <FixtureHeading match={m}/>
                </div>
                <div className='predictions-text'>
                    <div className='grid-container'>
                        <div className='grid-item1'>
                            <label className='team-name' htmlFor='homePrediction'>{`${shortName(m.homeName)} `}</label>
                        </div>
                        <Prediction
                            match={match}
                            isEdit={isEdit}
                            predictionsList={predictions}
                            updatePrediction={updatePrediction}
                            awayPrediction={awayPrediction}
                            onDelete={onDelete}
                            home={getHomePrediction(m)}
                            away={getAwayPrediction(m)}
                            prediction={getPrediction(m)}
                        />

                        {/* TODO: Final Score should only be rendered where match status is complete */}
                        <FinalScore
                            match={m}
                            home={getHomeScore(m)}
                            away={getAwayScore}
                            score={getFinalScore}
                        />

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
            </FixtureContext.Provider>
        </>
    )
};
