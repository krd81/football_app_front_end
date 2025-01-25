import { Fragment, useState } from 'react';
import useApp from '../hooks/useApp'
import { FixtureContext } from '../contexts/FixtureContext';
import FixtureHeading from './FixtureHeading';
import Prediction from './Prediction';
import FinalScore from './FinalScore';
import PredictionOutcome from './PredictionOutcome';
import shortName from '../functions/nameAbbreviation';
import '../css/MatchCard.css';

export default function FixtureList({
    date,
    fixtures,
    isEdit,
    // predictions,
    updatePrediction,
    matchesStarted,
    setMatchesStarted,
}) {
    const roundFixtures = fixtures;

    return (
        <>
            {roundFixtures?.map((match) => (
                match.date === date && (
                    <Fragment key={match.fixture_id + date} >
                        <Fixture
                            match={match}
                            isEdit={isEdit}
                            // predictionsList={predictions}
                            updatePrediction={updatePrediction}
                            matchesStarted
                            setMatchesStarted={setMatchesStarted}
                        />
                    </Fragment>
                )
            ))}
        </>
    )
};


function Fixture ({ match, isEdit, predictionsList, updatePrediction, matchesStarted, setMatchesStarted }) {
    const { results, selectedCompetition, round, userPredictions } = useApp();
    const [matchStatus, setMatchStatus] = useState('NOT STARTED');
    const m = match;
    const allResults = Array.isArray(results) ? results : [];;
    const predictions = Array.isArray(userPredictions) ? userPredictions : [];;

    if (!userPredictions) {
        throw new Error('User Predictions array is null');
    };

    // Check whether any fixtures for the current round have status "FINISHED"
    const getRoundResults = () => {
        return results.filter(result => {
            return result && result.competition.id === selectedCompetition.id
                && result.round === round
                && result.status === 'FINISHED';
        });
    };

    const roundResults = getRoundResults();

    // If roundResults has matching items, set matchesStarted
    // state variable to "true"
    if(roundResults.length < 1) {
        setMatchesStarted(false);
    } else {
        setMatchesStarted(true);

    };

    const updateMatchStatus = (status) => {
        setMatchStatus(status);
    };

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
        // if (prediction) {
        //     console.log(JSON.stringify(prediction))
        // };
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
        <FixtureContext.Provider>
            <div className='match-card'>
                <div className='card-content'>
                <div className='card-header-div'>
                    <FixtureHeading
                        match={m}
                        updateMatchStatus={updateMatchStatus}
                    />
                </div>
                <div>
                    {/* [DEBUG] - DISPLAY FIXTURE_ID */}
                    {`${m.fixture_id}`}
                </div>
                <div className='predictions-text'>
                    <div className='grid-container'>
                        <div className='grid-item1'>
                            <label className='team-name' htmlFor='homePrediction'>{`${shortName(m.homeName)} `}</label>
                        </div>
                        <Prediction
                            match={match}
                            isEdit={isEdit}
                            // predictionsList={predictions}
                            updatePrediction={updatePrediction}
                            // awayPrediction={awayPrediction}
                            // onDelete={onDelete}
                            home={getHomePrediction(m)}
                            away={getAwayPrediction(m)}
                            prediction={getPrediction(m)}
                        />

                        {/* TODO: Final Score should only be rendered where match status is complete */}
                            {(matchStatus == null || matchStatus === 'NOT STARTED') ?
                                null
                                :
                                (<FinalScore
                                    match={m}
                                    home={getHomeScore(m)}
                                    away={getAwayScore(m)}
                                    score={getFinalScore(m)}
                                    status={matchStatus}
                                />)
                            }
                        <div className='grid-item6'>
                                <label className='team-name' htmlFor='awayPrediction'>{` ${shortName(m.awayName)}`}</label>
                        </div>

                    </div>
                    <div className='outcome-div'>
                        <PredictionOutcome
                            match={m}
                            finalScore={getFinalScore(m) || null} // e.g. 0-0
                            predictedScore={`${getHomePrediction(m) || '0'} - ${getAwayPrediction(m) || '0'}`}
                            finalResult={getFinalResult(m) || null} // e.g. 'X' - draw
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
