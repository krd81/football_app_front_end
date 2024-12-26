import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../authentication/AppContext';
import { UpdateUserScore } from '../functions/updateUserScore';
import '../css/PredictionOutcome.css'

// Component will compare the user prediction to the match result and
// award a score
// Scoring: 3 points = correct score | 1 point = correct result | 0 points = incorrect result
const PredictionOutcome = ({ finalScore, predictedScore, finalResult, prediction,  }) => {
    const { round } = useContext(AppContext);
    const [userScore, setUserScore] = useState('');
  const [icon, setIcon] = useState(
    <svg width="75" height="75" xmlns="http://www.w3.org/2000/svg" className='svg-icon'>
      <circle cx="37.5" cy="37.5" r="30" fill="red"/>
      <line x1="20" y1="20" x2="55" y2="55" stroke="white" strokeWidth="10"/>
      <line x1="20" y1="55" x2="55" y2="20" stroke="white" strokeWidth="10"/>
    </svg>
  );



  // Returns the user's score for the match prediction
  // This can only happen once the match is complete and the result is final
  // Once calculated it dispatches the action of updating the user's score
  // in the predictions array

  useMemo(() => {

    const userPrediction = prediction;
    const matchScore = finalScore; // type string e.g. '2 - 3'
    const matchResult = finalResult; // 1, 2, X
    const predScore = predictedScore;

    const predictedResult = () => {
      return userPrediction?.outcomePrediction; // 1, 2, X
    };


    let n = 0;
    let iconColour;

    if (matchResult && matchResult === predictedResult()) {
      n += 1;
      iconColour = 'orange';
    };

    if (matchScore && matchScore === predScore) {
      n += 2;
      iconColour = 'green';
    };

    if (n > 0) {
      setIcon(
        <svg width="75" height="75" xmlns="http://www.w3.org/2000/svg" className='svg-icon'>
          <circle cx="37.5" cy="37.5" r="30" fill={iconColour} />
          <path d="M22.5 37.5 L33.75 48.75 L52.5 26.25" stroke="white" strokeWidth="10" fill="none" />
        </svg>
      );
    }

    if (matchScore && userPrediction) {
      setUserScore(n);
      UpdateUserScore(round, userPrediction.fixture_id, n);
    }
  }, [round, finalScore, predictedScore, finalResult, prediction]);




  return (
    <>
      {userScore ?
        (
          <>
            <div className='points-div'>
              <span>{userScore}&nbsp;</span>
              <span>{userScore === 1 ? 'point' : 'points'}</span>
            </div>
            <div className='outcome-icon'>
              {icon}
            </div>
          </>
        )
        :
        null
      }
    </>
  )
};

export default PredictionOutcome;