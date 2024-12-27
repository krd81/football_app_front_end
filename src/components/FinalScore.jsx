import { AppContext } from '../contexts/AppContext';
import { useContext } from 'react'


function FinalScore ({ match }) {
    const { results } = useContext(AppContext);
    const m = match;
    const allResults = results;


    // Returns the actual score (string e.g. '3 - 2') or null if not found
    const getFinalScore = (fixture) => {
        const matchResult = allResults.find(result => result.fixture_id === fixture.fixture_id);
        const scoreObject = matchResult?.scores;
        const score = scoreObject?.score;

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

    return (
        <>
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
        </>
    )
};

export default FinalScore;