import { Fragment, useContext, useEffect, useState, useMemo, useRef } from 'react'
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../functions/dateFormatter'
import shortName from '../functions/nameAbbreviation';
import { AppContext } from '../authentication/AppContext';
import { CompRoundContext } from '../common/CompRoundContext';
import { PredictionContext } from '../common/PredictionContext';


const Predictions = ({ round }) => {
  const { selectedCompetition, fixtures, predictions, currentUser } = useContext(AppContext);
  // const [predictions, setPredictions] = useState({});
  const [userPredictions, setUserPredictions] = useState({});
  const [inputFields, setInputFields] = useState({});
  const [editMode, setEditMode] = useState(true);


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





  // Predictions stored in context are for the selected competition/round
  // This useEffect filters those belonging to the current user
  useEffect(() => {
    console.log(currentUser);

    const filteredPredictions = predictions.filter(prediction => {
      return prediction.user && prediction.user._id === currentUser._id;
    });

    setUserPredictions(filteredPredictions);
  }, [predictions, currentUser]);

// Function to map through userPredictions and select the prediction which
// corresponds with the match being displayed
  const getUserPrediction = (match, team) => {

    // initially filter all predictions and return those belonging to the user
    const userPredictions_new = predictions.filter(prediction => {
      return prediction.user && prediction.user._id === currentUser._id;
    });

    userPredictions_new.map((userPrediction) => {
      if (match.fixture_id === userPrediction.fixture_id) {
        switch (team) {
          case 'home':
            console.log('Home prediction: ' + userPrediction.homeName + ' - ' + userPrediction.homePrediction);
            return userPrediction.homePrediction;
          case 'away':
            console.log('Away prediction: ' + userPrediction.awayName + ' - ' + userPrediction.awayPrediction);
            return userPrediction.awayPrediction;
          default:
            return null;
        }
      } else {
        return '';
      }
    });
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
              {currentFixtures?.map((match) => (
                match.date === fixtureDate && (
                  <Fragment key={match.fixture_id + fixtureDate}>
                    <div className='match-card'>
                      <div className='predictions-text'>
                        <div className='grid-container'>
                          <div className='grid-item1'>
                            <label className='team-name' htmlFor='homePrediction'>{`${shortName(match.homeName)} `}</label>
                          </div>
                          <div className='grid-item2'>
                            {editMode ? (
                              <>
                                <input
                                  className='score-input'
                                  id={`${match.homeName}`}
                                  name='homePrediction'
                                  type='text'
                                  size="1"
                                  // value={userPredictions[match.fixture_id]?.homePrediction || ''}
                                  value={getUserPrediction(match, 'home') || ''}
                                  onChange={(e) => handleInputChange(e, match.fixture_id)}
                                />
                                &nbsp;-&nbsp;
                                <input
                                  className='score-input'
                                  id={`${match.awayName}`}
                                  name='awayPrediction'
                                  type='text'
                                  size="1"
                                  // value={userPredictions[match.fixture_id]?.awayPrediction || ''}
                                  value={getUserPrediction(match, 'away') || ''}
                                  onChange={(e) => handleInputChange(e, match.fixture_id)}
                                />
                              </>
                            ) : (
                              // <span>{`${userPredictions[match.fixture_id]?.homePrediction || ''} - ${userPredictions[match.fixture_id]?.awayPrediction || ''}`}</span>
                              <span>{`${getUserPrediction(match, 'home') || ''} - ${getUserPrediction(match, 'away') || ''}`}</span>
                            )}
                          </div>
                          <div className='grid-item1'>
                                  <label className='team-name' htmlFor='awayPrediction'>{` ${shortName(match.awayName)}`}</label>
                                </div>
                        </div>
                      </div>
                      <p className='predictions-text'>{`Kick-off: ${match.time}`}</p>
                              <p className='predictions-text'>{`${match.location}`}</p>
                      </div>
                  </Fragment>
                )
              ))}
            </form>
          </Fragment>

        ))};
      </div>
      </div>
    </>
  )
};

export default Predictions;