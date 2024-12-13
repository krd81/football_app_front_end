import { Fragment, useState, useContext } from 'react'
import { AppContext } from '../authentication/AppContext';
import shortName from '../functions/nameAbbreviation';

export default function FixtureList({ date, fixtures, isEdit}) {
    const roundFixtures = fixtures;

    return (
    <>
        {roundFixtures?.map((match) => (
            match.date === date && (
                <Fragment key={match.fixture_id + date} >
                    <Fixture match={match} isEdit={isEdit} />
                </Fragment>
        )
        ))}

    </>
  )
}

function Fixture ({ match, isEdit }) {
    const { predictions, currentUser } = useContext(AppContext);
    const m = match;

    // Function to map through userPredictions and select the prediction which
    // corresponds with the match being displayed
    const getUserPrediction = (match, team) => {
        // initially filter all predictions and return those belonging to the user
        const userPredictions_new = predictions.filter(prediction => {
            return prediction.user && prediction.user._id === currentUser._id;
        });

        userPredictions_new.map((userPrediction) => {
            if (m.fixture_id === userPrediction.fixture_id) {
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

    return (
        <>
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
                                    value={getUserPrediction(m, 'home') || ''}
                                    // onChange={(e) => handleInputChange(e, match.fixture_id)}
                                />
                                &nbsp;-&nbsp;
                                <input
                                    className='score-input'
                                    id={`${m.awayName}`}
                                    name='awayPrediction'
                                    type='text'
                                    size="1"
                                    value={getUserPrediction(m, 'away') || ''}
                                    // onChange={(e) => handleInputChange(e, match.fixture_id)}
                                />
                                </>
                            ) : (
                                <span>{`${getUserPrediction(m, 'home') || ''} - ${getUserPrediction(m, 'away') || ''}`}</span>
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
