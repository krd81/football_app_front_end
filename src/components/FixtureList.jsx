import { Fragment, useContext } from 'react'
import { AppContext } from '../authentication/AppContext';
import shortName from '../functions/nameAbbreviation';

export default function FixtureList({
    date,
    fixtures,
    isEdit,
    predictions,
    updatePrediction,
    addAwayPrediction,
    onDeletePrediction
}) {
    const roundFixtures = fixtures;

    return (
    <>
        {roundFixtures?.map((match) => (
            match.date === date && (
                <Fragment key={match.fixture_id + date} >
                    <Fixture
                        match={match}
                        isEdit={isEdit}
                        updatePrediction={updatePrediction}
                        awayPrediction={addAwayPrediction}
                        onDelete={onDeletePrediction}
                    />
                </Fragment>
        )
        ))}

    </>
  )
}

function Fixture ({ match, isEdit, updatePrediction, awayPrediction, onDelete }) {
    const { predictions: allPredictions, currentUser } = useContext(AppContext);
    const m = match;
    // let prediction = '';

    // initially filter all predictions and return those belonging to the user
    const userPredictions = allPredictions.filter(prediction => {
        return prediction.user && prediction.user._id === currentUser._id;
    });


    // Function to map through userPredictions and select the prediction which
    // corresponds with the match being displayed
    /*
    const getUserPrediction = (team) => {

        userPredictions.map((userPrediction) => {
            if (m.fixture_id === userPrediction.fixture_id) {
                switch (team) {
                case 'home':
                    console.log('Home prediction: ' + userPrediction.homeName + ' - ' + userPrediction.homePrediction);
                    prediction = userPrediction.homePrediction;
                    break;
                case 'away':
                    console.log('Away prediction: ' + userPrediction.awayName + ' - ' + userPrediction.awayPrediction);
                    prediction = userPrediction.awayPrediction;
                    break;
                default:
                    prediction = '';
                }
            } else {
                prediction = '';
            }
        });
    };
*/
    const getHomePrediction = (fixture) => {
        const prediction = userPredictions.find(pred => pred.fixture_id === fixture.fixture_id);
        console.log(fixture)
        console.log(`Home prediction for `+ fixture.homeName + `: ` + prediction?.homePrediction );
        return prediction ? prediction.homePrediction : '';
    }

    const getAwayPrediction = (fixture) => {
        const prediction = userPredictions.find(pred => pred.fixture_id === fixture.fixture_id);
        console.log(`Away prediction for `+ fixture.awayName + `: ` + prediction?.awayPrediction );
        return prediction ? prediction.awayPrediction : '';
    }

    const getPrediction = (fixture) => {
        const prediction = userPredictions.find(pred => pred._id === fixture.fixture_id);
        return prediction || null;
    }


    return (
        <>
        {console.log(userPredictions)}
            <div className='match-card'>
                <div className='predictions-text'>
                    <div className='grid-container'>
                        <div className='grid-item1'>
                            <label className='team-name' htmlFor='homePrediction'>{`${shortName(m.homeName)} `}</label>
                        </div>
                        <div className='grid-item2'>
                            {isEdit ? (
                                <>
                                <input
                                    className='score-input'
                                    id={`${m.homeName}`}
                                    name='homePrediction'
                                    type='text'
                                    size="1"
                                    value={getHomePrediction(m) || ''}
                                    onChange={e => {
                                        const prediction = getPrediction(m);
                                        updatePrediction({
                                            ...prediction,
                                            homePrediction: e.target.value
                                        });
                                    }}
                                />
                                &nbsp;-&nbsp;
                                <input
                                    className='score-input'
                                    id={`${m.awayName}`}
                                    name='awayPrediction'
                                    type='text'
                                    size="1"
                                    value={getAwayPrediction(m) || ''}
                                    onChange={e => {
                                        const prediction = getPrediction(m);
                                        updatePrediction({
                                            ...prediction,
                                            awayPrediction: e.target.value
                                        });
                                    }}

                                />
                                </>
                            ) : (
                                // <span>{`${getUserPrediction(m, 'home') || ''} - ${getUserPrediction(m, 'away') || ''}`}</span>
                                <span>{`${getHomePrediction(m) || ''} - ${getAwayPrediction(m) || ''}`}</span>
                            )}
                        </div>
                        <div className='grid-item1'>
                                <label className='team-name' htmlFor='awayPrediction'>{` ${shortName(m.awayName)}`}</label>
                            </div>
                    </div>
                </div>
                <p className='predictions-text'>{`Kick-off: ${m.time}`}</p>
                        <p className='predictions-text'>{`${m.location}`}</p>
            </div>

        </>
    )
};
