import { Fragment, useContext, useEffect, useState, useMemo, useReducer } from 'react'
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../functions/dateFormatter'
import { AppContext } from '../authentication/AppContext';
import predictionsReducer from '../common/PredictionsReducer';
import FixtureList from './FixtureList';
import { PredictionContext } from '../common/PredictionContext';


const Predictions = ({ round }) => {
  const { predictions: allPredictions, fixtures } = useContext(AppContext);
  const [userPredictions, setUserPredictions] = useState({});
  const [editMode, setEditMode] = useState(true);
  const [predictions, dispatch] = useReducer(predictionsReducer, initialPredictions);

  const initialPredictions = [...allPredictions];

  function handleAddPrediction(fixtureId, home, away) {
    dispatch({
      type: 'added',
      fixtureId: fixtureId,
      homePrediction: home,
      awayPrediction: away
    })
  };

  function handleEditPrediction(fixtureId, home, away) {
    dispatch({
      type: 'updated',
      fixtureId: fixtureId,
      homePrediction: home,
      awayPrediction: away
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



  const handleInputChange = (e, fixtureId) => {
    const { name, value } = e.target;
    setUserPredictions(prevState => ({
      ...prevState,
      [fixtureId]: {
        ...prevState[fixtureId],
        [name]: value
      }
    }));
  };



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
      <div>
        <h1>Predictions  - Matchweek {round}:</h1>
      </div>
      <div>
      <button className='edit-mode-btn' onClick={handleEditButton}>{editMode ? `View` : `Edit`}</button>
      <div className='match-list'>
        {fixtureDates?.map((fixtureDate) => (
          <Fragment key={fixtureDate}>
            <div className='date-header'>
              <h3 className='date-text'>{dateFormatter2(fixtureDate)}</h3>
            </div>
            <form onSubmit={handleSubmit} key={fixtureDate}>

              <FixtureList
                date={fixtureDate}
                fixtures={currentFixtures}
                isEdit={editMode}
                predictions={predictions}
                onAddPrediction={handleAddPrediction}
                onEditPrediction={handleEditPrediction}
                onDeletePrediction={handleDeletePrediction}
              />



            </form>
          </Fragment>

        ))};
      </div>
      </div>
    </>
  )
};

export default Predictions;