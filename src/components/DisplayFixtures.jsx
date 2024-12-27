import { Fragment, useContext, useState, useMemo, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../functions/dateTimeFormatter'
import { AppContext } from '../contexts/AppContext';
import predictionsReducer from '../common/PredictionsReducer';
import FixtureList from './FixtureList';
import { UserTotalRoundScore } from './UserScores'
import { PredictionContext } from '../contexts/PredictionContext';

// Previously called Predictions.jsx
// This component sets up the fixtures and determines which elements are shown
// At this point, the user has selected the competition and round
// The next step is to display the relevant fixtures, the predictions (if any) and either
// - match status (if complete or in play)
// - date/time (if non started)
const DisplayFixtures = () => {
  const { allPredictions, setAllPredictions, fixtures, round, currentUser } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const nav = useNavigate();


  // initially filter all predictions and return those belonging to the user
  const initialPredictions = useMemo(() => {
    return allPredictions.filter(prediction => {
      return prediction.user && prediction.user._id === currentUser._id;
    });
  }, [allPredictions, currentUser._id]);


  const [predictions, dispatch] = useReducer(predictionsReducer, initialPredictions);


  function handleUpdatePrediction(prediction) {
    dispatch({
      type: 'updatedPrediction',
      prediction: prediction
    })
  };

  function handleAwayPrediction(fixtureId, predictedScore) {
    dispatch({
      type: 'addedAway',
      fixtureId: fixtureId,
      awayPrediction: predictedScore
    })
  };

  function handleDeletePrediction(fixtureId) {
    dispatch({
      type: 'deleted',
      fixtureId: fixtureId
    })
  };



  const currentFixtures = useMemo(() => {
    return getRoundFixtures(fixtures, round)
  }, [fixtures, round]);


  function getRoundFixtures (fixtures, round) {
    const newFixtures = [];
    for (let fixture in fixtures) {
        for (let matchElement in fixtures[fixture]) {
            if (matchElement === 'round' &&
                  fixtures[fixture][matchElement] === round &&
                !newFixtures.includes(fixtures[fixture])) {
                    newFixtures.push(fixtures[fixture]);
            }
        }
    }
    return newFixtures;
  };


  const fixtureDates = getDates(currentFixtures);



  const handleEditButton = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = 'http://127.0.0.1:8005/predictions';

    for (const prediction of predictions) {
      const url = `${apiUrl}/${prediction._id}`;
      const update = {
        homePrediction: prediction.homePrediction,
        awayPrediction: prediction.awayPrediction
      };

      const method = 'PUT';

      try {
        await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify(update),
        });
        setAllPredictions(predictions);
        setEditMode(false);

      } catch (error) {
        console.error('Failed to create/update listing:', error);
      };
    };
  };




  return (
    <>

      <PredictionContext.Provider></PredictionContext.Provider>
      <div className='title-div'>
        <h1>Predictions  - Matchweek {round}:</h1>
        <div className='edit-button-div'>
          <button className='edit-mode-btn' onClick={handleEditButton}>{editMode ? `View Mode` : `Edit Mode`}</button>
        </div>
        </div>
      <div className='match-list-parent'>
      <form onSubmit={handleSubmit}>

        <div className='match-list'>
          {fixtureDates?.map((fixtureDate) => (
            <Fragment key={fixtureDate}>
              <div className='date-header'>
                <h3 className='date-text'>{dateFormatter2(fixtureDate)}</h3>
              </div>

                <FixtureList
                  date={fixtureDate}
                  fixtures={currentFixtures}
                  isEdit={editMode}
                  predictions={predictions}
                  updatePrediction={handleUpdatePrediction}
                  addAwayPrediction={handleAwayPrediction}
                  onDeletePrediction={handleDeletePrediction}
                />
            </Fragment>

          ))}
          {/* TODO: Only show total score component when at least one match of the round is complete?? */}
            <UserTotalRoundScore />

        </div>
        {editMode ?
          (
            <>
              <div className='save-back-button-div'>
                <input className='save-back-button' type="submit" value='Save Changes'></input>
              </div>
            </>
          )
          :
          (
            <>
              <div className='save-back-button-div'>
                <button className='save-back-button' onClick={() => nav('/play')}>Back</button>
              </div>
            </>
          )
        }
      </form>

      </div>
    </>
  )
};

export default DisplayFixtures;