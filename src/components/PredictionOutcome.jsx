import { useState, useMemo } from 'react';
import useApp from '../hooks/useApp';
import { updateUserScore } from '../functions/updateUserScore';
import '../css/PredictionOutcome.css';

// Component will compare the user prediction to the match result and
// award a score
// Scoring: 3 points = correct score | 1 point = correct result | 0 points = incorrect result
const PredictionOutcome = ({
    finalScore,
    predictedScore,
    finalResult,
    prediction,
}) => {
    const { userScores, setUserScores } = useApp();
    const [userScore, setUserScore] = useState(null);
    const [icon, setIcon] = useState('');

    const userPrediction = prediction;
    const matchScore = finalScore; // type string e.g. '2 - 3'
    const matchResult = finalResult; // 1, 2, X
    const predScore = predictedScore;

    const predictedResult = () => {
        return userPrediction?.outcomePrediction; // 1, 2, X
    };

    let score = 0;
    let iconColour = 'red';

    if (matchResult && matchResult === predictedResult()) {
        score += 1;
        iconColour = 'orange';
    }

    if (matchScore && matchScore === predScore) {
        score += 2;
        iconColour = 'green';
    }

    useMemo(() => {
        if (score > 0) {
            setIcon(
                <svg
                    width="75"
                    height="75"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon"
                >
                    <circle cx="37.5" cy="37.5" r="30" fill={iconColour} />
                    <path
                        d="M22.5 37.5 L33.75 48.75 L52.5 26.25"
                        stroke="white"
                        strokeWidth="10"
                        fill="none"
                    />
                </svg>
            );
        } else {
            setIcon(
                <svg
                    width="75"
                    height="75"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon"
                >
                    <circle cx="37.5" cy="37.5" r="30" fill={iconColour} />
                    <line
                        x1="20"
                        y1="20"
                        x2="55"
                        y2="55"
                        stroke="white"
                        strokeWidth="10"
                    />
                    <line
                        x1="20"
                        y1="55"
                        x2="55"
                        y2="20"
                        stroke="white"
                        strokeWidth="10"
                    />
                </svg>
            );
        }
    }, [score, iconColour]);

    useMemo(() => {
        if (matchScore && userPrediction) {
            setUserScore(score);
            updateUserScore(userScores, setUserScores, userPrediction, score);
        }
    }, [matchScore, userPrediction, score]);

    return (
        <>
            {userScore !== null ? (
                <>
                    <div className='points-div'>
                        <span>{userScore}&nbsp;</span>
                        <span>{userScore === 1 ? 'point' : 'points'}</span>
                    </div>
                    <div className="outcome-icon">{icon}</div>
                </>
            ) : null}
        </>
    );
};

export default PredictionOutcome;
