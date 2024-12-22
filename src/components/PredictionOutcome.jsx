import React from 'react'

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

  // Score calc
  const score = () => {
    let n = 0;
    if (matchResult === predictedResult()) {
      n += 1;
    };

    if (matchScore === predScore) {
      n += 2;
    }

    return n;
  }

  return (
    <>
      <div>
        <span>{score()}&nbsp;</span>
        <span>{score() === 1 ? 'point' : 'points'}</span>

      </div>
    </>
  )
}

export default PredictionOutcome;