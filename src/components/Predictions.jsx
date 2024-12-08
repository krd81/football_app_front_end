import { Fragment, useContext, useEffect, useState, useMemo, useRef } from 'react'
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../functions/dateFormatter'
import shortName from '../functions/nameAbbreviation';
import { AppContext } from '../authentication/AppContext';
import { CompRoundContext } from '../common/CompRoundContext';
import { PredictionContext } from '../common/PredictionContext';


const Predictions = ({ round }) => {
  const { selectedCompetition, fixtures, currentUser } = useContext(AppContext);
  // const { predictions } = useContext(CompRoundContext);
  const [predictions, setPredictions] = useState({});
  const [userPredictions, setUserPredictions] = useState({});
  const [inputFields, setInputFields] = useState({});
  const [editMode, setEditMode] = useState(false);
  const hasFetchedData = useRef(false);

  useEffect(() => {
      let roundPredictions;
      const fetchData = async () => {
      try {
        // const apiUrl = import.meta.env.VITE_API_URL;
        const apiUrl = 'http://127.0.0.1:8005';
        const result = await fetch(`${apiUrl}/predictions/competition/${selectedCompetition.id}/round/${round}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `null`
          }
        });
        roundPredictions = await result.json();
        setPredictions(roundPredictions);
  } catch (error) {
          console.error('Error fetching predictions:', error);
      }
    };
    if (selectedCompetition.id && round && !hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
}, [round, selectedCompetition.id]);



  const currentFixtures = useMemo(() => {
    return getRoundFixtures(fixtures, round);
  }, [fixtures, round]);

  function getRoundFixtures (fixtures, round) {
    const newFixtures = [];
    for (let fixture in fixtures) {
        for (let matchElement in fixtures[fixture]) {
            if (matchElement === 'round' &&
                  fixtures[fixture][matchElement] === round) {
                    newFixtures.push(fixtures[fixture]);
            }
        }
    }
    return newFixtures;
  }

  /*
  const roundPredictions = useMemo(() => {
    const getRoundPredictions = () => {
      const filteredPredictions = [];
      for (let prediction in predictions) {
        for (let predictionElement in prediction) {
          if (predictionElement === 'user' &&
            predictions[prediction][predictionElement] === currentUser) {
              filteredPredictions.push(predictions[prediction]);
            }
        }
      }
      return filteredPredictions;
    };
    return getRoundPredictions();
  }, [predictions, currentUser]);
*/

  // Predictions stored in context are for the selected competition/round
  // This useEffect filters those belonging to the current user
  useEffect(() => {
    const filteredPredictions = [];
    for (let prediction in predictions) {
      for (let predictionElement in prediction) {
        if (predictionElement === 'user' &&
          predictions[prediction][predictionElement] === currentUser) {
            filteredPredictions.push(predictions[prediction]);
          }
      }
    }
    setUserPredictions(filteredPredictions);
  }, [predictions, currentUser]);

  const setPredictionInputs = (fixtureId) => (
    setInputFields({
      homePrediction: userPredictions[fixtureId] ? userPredictions[fixtureId].homePrediction : '',
      awayPrediction: userPredictions[fixtureId] ? userPredictions[fixtureId].awayPrediction : '',
    }
  ));



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
      </div>
      <div className='match-list'>
        {fixtureDates?.map((fixtureDate) => {
          return (
            <Fragment key={fixtureDate}>
              <div className='date-header'>
                {/* Displays date */}
                <h3 className='date-text'>{dateFormatter2(fixtureDate)}</h3>
              </div>
              <form onSubmit={handleSubmit} key={fixtureDate}>
                {currentFixtures?.map((match) => {
                  setPredictionInputs(match);
                  if (match.date === fixtureDate) {
                    return (
                      <>
                        <Fragment key={match.fixtureId + fixtureDate}>
                          <div className='match-card' >
                            <div className='predictions-text'>
                              <div className='grid-container'>
                                <div className='grid-item1'>
                                  <label className='team-name' htmlFor='homePrediction'>{`${shortName(match.homeName)} `}</label>
                                </div>
                                <div className='grid-item2'>
                                  {editMode ? (
                                    <>
                                      <input className='score-input' id={`${match.homeName}`} name='homePrediction' type='text' size="1" value={inputFields.homePrediction}></input>
                                      &nbsp;-&nbsp;
                                      <input className='score-input' id={`${match.awayName}`} name='awayPrediction' type='text' size="1" value={inputFields.awayPrediction}></input>
                                    </>
                                  ) : (
                                    <>
                                      <input className='score-input' id={`${match.homeName}`} name='homePrediction' type='text' size="1" value={inputFields.homePrediction} readOnly></input>
                                      &nbsp;-&nbsp;
                                      <input className='score-input' id={`${match.awayName}`} name='awayPrediction' type='text' size="1" value={inputFields.awayPrediction} readOnly></input>
                                    </>
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
                      </>
                    )
                  };
                })};
              </form>
            </Fragment>
          )
        })};
      </div>
    </>
  )
};

export default Predictions;