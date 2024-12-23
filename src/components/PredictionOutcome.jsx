import React from 'react'
import '../css/PredictionOutcome.css'

// Component will compare the user prediction to the match result and
// award a score
// Scoring: 3 points = correct score | 1 point = correct result | 0 points = incorrect result
const PredictionOutcome = ({ finalScore, predictedScore, finalResult, prediction }) => {
  const matchScore = finalScore; // type string e.g. '2 - 3'
  const predScore = predictedScore;

  const matchResult = finalResult; // 1, 2, X

  const predictedResult = () => {
    const userPrediction = prediction;
    return userPrediction?.outcomePrediction; // 1, 2, X
  };

  let icon = () => {
    return(
      <svg width="75" height="75" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37.5" cy="37.5" r="30" fill="red"/>
        <line x1="20" y1="20" x2="55" y2="55" stroke="white" strokeWidth="10"/>
        <line x1="20" y1="55" x2="55" y2="20" stroke="white" strokeWidth="10"/>
      </svg>

    )
  }

  // Score calc
  const score = () => {
    let n = 0;
    let iconColour;
    if (matchResult === predictedResult()) {
      n += 1;
      iconColour = 'orange';
    };

    if (matchScore === predScore) {
      n += 2;
      iconColour = 'green';
    };

    if (n > 0) {
      icon = () => {
        return (
          <svg width="75" height="75" xmlns="http://www.w3.org/2000/svg">
            <circle cx="37.5" cy="37.5" r="30" fill={iconColour}/>
            <path d="M22.5 37.5 L33.75 48.75 L52.5 26.25" stroke="white" strokeWidth="10" fill="none"/>
          </svg>
        );
      }
    };

    return n;
  };

  return (
    <>
      <div className='bottom-icons'>
        <div className='points-div'>
          <span>{score()}&nbsp;</span>
          <span>{score() === 1 ? 'point' : 'points'}</span>
        </div>
        <div className='outcome_icon'>
          {icon()}

        </div>
      </div>
    </>
  )
}

export default PredictionOutcome;