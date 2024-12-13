import { Fragment, useContext, useEffect, useState, useMemo, useReducer } from 'react'
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../functions/dateFormatter'
import { AppContext } from '../authentication/AppContext';
import inputReducer from '../common/InputReducer';
import FixtureList from './FixtureList';
import { PredictionContext } from '../common/PredictionContext';


const Predictions = ({ round }) => {
  const { fixtures } = useContext(AppContext);
  // const [predictions, setPredictions] = useState({});
  const [userPredictions, setUserPredictions] = useState({});
  const [editMode, setEditMode] = useState(true);
  const [inputFields, dispatch] = useReducer(inputReducer, initialInputs);

  function handleUpdateField(updatedInput) {
    dispatch({
      type: 'update'
    })
  }


  // This is causing a 'too many re-renders' error
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
        {console.log(userPredictions)}
        {/* {console.log(Object.values(userPredictions[0]))} */}
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