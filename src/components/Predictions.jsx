import { Fragment, useContext, useEffect, useState, useMemo, useReducer } from 'react'
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../functions/dateFormatter'
import { AppContext } from '../authentication/AppContext';
import predictionsReducer from '../common/PredictionsReducer';
import FixtureList from './FixtureList';
import { PredictionContext } from '../common/PredictionContext';


const Predictions = ({ round }) => {
  const { allPredictions, fixtures, currentUser } = useContext(AppContext);
  const [editMode, setEditMode] = useState(true);

    // initially filter all predictions and return those belonging to the user
    const initialPredictions = allPredictions.filter(prediction => {
      return prediction.user && prediction.user._id === currentUser._id;
   });


  // const initialPredictions = allPredictions;
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
    return getRoundFixtures(fixtures, round);
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
  }




  const fixtureDates = getDates(currentFixtures);

  const handleEditButton = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const formDataObj = Object.fromEntries(formData.entries())

  }



  return (
    <>
      <PredictionContext.Provider></PredictionContext.Provider>
      <div className='title-div'>
        <h1>Predictions  - Matchweek {round}:</h1>
        <div className='edit-button-div'>
          <button className='edit-mode-btn' onClick={handleEditButton}>{editMode ? `View Mode` : `Edit Mode`}</button>
        </div>
        </div>
      <div>
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
        </div>
        <div className='save-button-div'>
          <input className='save-button' type="submit" value='Save Changes'></input>
        </div>
      </form>

      </div>
    </>
  )
};

export default Predictions;