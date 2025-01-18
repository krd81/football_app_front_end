import { Fragment, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Scores.css'
import getDates from '../functions/getDates';
import { dateFormatter2 } from '../functions/dateTimeFormatter'
import useApp from '../hooks/useApp'
import FixtureList from '../components/FixtureList';
import { UserTotalPoints } from '../components/UserTotalPoints';
import { getPredictions } from '../functions/getPredictions.jsx';

// This component sets up the fixtures and determines which elements are shown
// At this point, the user has selected the competition and round
// The next step is to display the relevant fixtures, the predictions (if any) and either
// - match status (if complete or in play)
// - date/time (if non started)
const DisplayFixtures = () => {
  const { allPredictions, setAllPredictions, fixtures, selectedCompetition, round, currentUser, userPredictions, setUserPredictions } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [matchesStarted, setMatchesStarted] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [changedPredictions, setChangedPredictions] = useState([]);
  const comp = selectedCompetition;
  const nav = useNavigate();

  // initially filter all predictions and return those belonging to the user
  useMemo(() => {
    if (!(Array.isArray(allPredictions) && currentUser)) return [];

    return allPredictions.filter(prediction => {
      return prediction.user?._id === currentUser._id;
    });
  }, [allPredictions, currentUser]);

  function handleUpdatePrediction(prediction) {
    const newUserPredictions = userPredictions.map((p) => {
      if (p.fixture_id === prediction.fixture_id) {
        // console.log(`Updated prediction: ` + JSON.stringify(prediction))
        const unrelatedChangedPredictions = changedPredictions.filter(pred => pred._id !== prediction._id);
        setChangedPredictions([...unrelatedChangedPredictions, prediction]);
        return prediction;
      } else {
        return p;
      }
    });
    setUserPredictions(newUserPredictions);
  };

  function setPoints (pointsTotal) {
    setTotalPoints(pointsTotal);
  };

  const currentFixtures = useMemo(() => {
    /*
    getRoundFixtures filters the entire list of fixtures set when the app
    was intially launched, retaining only those that match the selected competition
    and round
    */
    function getRoundFixtures (fixtures, round) {
      const newFixtures = [];
      for (let fixture of fixtures) {
        for (let matchElement_1 in fixture) {
          for (let matchElement_2 in fixture) {
            if (matchElement_1 === 'competitionId' &&
                  matchElement_2 === 'round' &&
                  fixture[matchElement_1] === comp.id &&
                    fixture[matchElement_2] === round &&
                      !newFixtures.includes(fixture)) {
                      newFixtures.push(fixture);
              };
          };
        };
      };
      return newFixtures;
    };

    return getRoundFixtures(fixtures, round);
  }, [fixtures, round, comp.id]);


  const fixtureDates = getDates(currentFixtures);


  const handleEditButton = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = import.meta.env.VITE_API_URL_USER_DB;

    for (const prediction of changedPredictions) {
      const url = `${apiUrl}/predictions/${prediction._id}`;
      const update = {
        homePrediction: prediction.homePrediction,
        awayPrediction: prediction.awayPrediction,
        outcomePrediction: prediction.outcomePrediction
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
        // console.log(`Predictions updated in database: ${JSON.stringify(predictions)}`)
      } catch (error) {
        console.error('Failed to create/update listing:', error);
      };
    };
    const fetchedPredictions = await getPredictions();
    setAllPredictions(fetchedPredictions);
    setChangedPredictions([]);
    setIsSaving(false);
    setEditMode(false);
  };

  /*  Once match status is 'FINISHED' trigger update of user
      score and store updated score in database.
  */

      const showUserPredictions = () => {
        // console.log(`User Predictions: ${predictions}`)
      }


  return (
    <>
      <div className='title-div'>
        <h1>Predictions  - Matchweek {round}:</h1>
        <div className='edit-button-div'>
          <button className='edit-mode-btn' onClick={handleEditButton} disabled={isSaving}>{editMode ? `View Mode` : `Edit Mode`}</button>
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
              {showUserPredictions()}

                <FixtureList
                  date={fixtureDate}
                  fixtures={currentFixtures}
                  isEdit={editMode}
                  // predictions={predictions}
                  updatePrediction={handleUpdatePrediction}
                  matchesStarted
                  setMatchesStarted={setMatchesStarted}
                />
            </Fragment>

          ))}
          {/* matchesStarted state variable controls displaying of total score component
          only when at least one match of the round is complete */}
          {matchesStarted ?
            <UserTotalPoints totalPoints={totalPoints} updatePointsTotal={setPoints}/>
          : null
          }
        </div>
        {editMode ?
          (
            <>
              <div className='save-back-button-div'>
                <button className='save-back-button' type="submit" disabled={isSaving}>{isSaving ? "Saving changes..." : 'Save Changes'}</button>
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