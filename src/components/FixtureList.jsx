/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
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
    let { results, selectedCompetition, round, setUserPredictions, currentUser } = useApp();
    const [matchStatus, setMatchStatus] = useState('NOT STARTED');
    let [newPredictions, setNewPredictions] = useState([]);
    const m = match;
    const allResults = Array.isArray(results) ? results : [];
    const apiUrl = import.meta.env.VITE_API_URL_FB_DB;

    // userPredictions = Array.isArray(userPredictions) ? userPredictions : [];

    const fetchPredictions = async () => {
        const id = currentUser._id;
        const { data } = await axios.get(`${apiUrl}/predictions/${id}`);
        return data;
    };

    const savePrediction = async (prediction) => {
    const { data } = await axios.post(`${apiUrl}/predictions`, prediction);
    return data;
    };

    // if (!userPredictions) {
    //     throw new Error('User Predictions array is null');
    // };

    const queryClient = useQueryClient();
    let { data: userPredictions, isLoading } = useQuery('predictions', fetchPredictions);
    const mutation = useMutation(savePrediction, {
      onSuccess: () => {
        queryClient.invalidateQueries('predictions');
      },
    });


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
        userPredictions = Array.isArray(userPredictions) ? userPredictions : [];
        const prediction = userPredictions.find(pred => pred.fixture_id === fixture.fixture_id);

        return prediction ? prediction.homePrediction : 0;
    };

    // Returns the number of goals predicted for the away team
    // Returns null if no prediction is found
    const getAwayPrediction = (fixture) => {
        const prediction = userPredictions.find(pred => pred.fixture_id === fixture.fixture_id);
        return prediction ? prediction.awayPrediction : 0;
    };

    // Returns the prediction object for the specific match or null if no prediction is found
    const getPrediction = (fixture) => {
        let prediction = userPredictions.find(pred => pred.fixture_id === fixture.fixture_id);
        newPredictions = Array.isArray(newPredictions) ? newPredictions : [];
        let localPrediction = newPredictions.find(pred => pred.fixture_id === fixture.fixture_id);
        if (!prediction && !localPrediction) {
            prediction = {
                competitionId: fixture.competitionId,
                round: fixture.round,
                groupId: fixture.groupId,
                fixture_id: fixture.fixture_id,
                homeName: fixture.homeName,
                awayName: fixture.awayName,
                homePrediction: 0,
                awayPrediction: 0,
                outcomePrediction: 'X',
                user: currentUser
            };
            updateLocalPredictions(prediction);
            mutation.mutate(prediction);
        };
        // return prediction || null;
        return prediction;
    };

    const updateLocalPredictions = (newPrediction) => {
        let prediction = userPredictions.find(pred => pred.fixture_id === newPrediction.fixture_id);
        if (!prediction) {
            setNewPredictions([...newPredictions, newPrediction]);
        };
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

    if (isLoading) {
        return <div>Kelly...</div>;
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
