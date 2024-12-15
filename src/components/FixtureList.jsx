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
                        predictionsList={predictions}
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

function Fixture ({ match, isEdit, predictionsList, updatePrediction, awayPrediction, onDelete }) {
    const m = match;
    const predictions = predictionsList;

    const getHomePrediction = (fixture) => {
        const prediction = predictions.find(pred => pred.fixture_id === fixture.fixture_id);
        return prediction ? prediction.homePrediction : '';
    }

    const getAwayPrediction = (fixture) => {
        const prediction = predictions.find(pred => pred.fixture_id === fixture.fixture_id);
        return prediction ? prediction.awayPrediction : '';
    }

    const getPrediction = (fixture) => {
        const prediction = predictions.find(pred => pred.fixture_id === fixture.fixture_id);
        console.log(prediction)
        return prediction || null;
    }


    return (
        <>
        {console.log(predictions)}
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
                                    type='number'
                                    size="1"
                                    min="0"
                                    max="10"
                                    value={getHomePrediction(m) >=0 ? getHomePrediction(m) : ''}
                                    onChange={e => {
                                        const prediction = getPrediction(m);
                                        updatePrediction({
                                            ...prediction,
                                            homePrediction: Number(e.target.value)
                                        });
                                    }}
                                />
                                &nbsp;&mdash;&nbsp;
                                <input
                                    className='score-input'
                                    id={`${m.awayName}`}
                                    name='awayPrediction'
                                    type='number'
                                    size="1"
                                    min="0"
                                    max="10"
                                    value={getAwayPrediction(m) >=0 ? getAwayPrediction(m) : ''}
                                    onChange={e => {
                                        const prediction = getPrediction(m);
                                        updatePrediction({
                                            ...prediction,
                                            awayPrediction: Number(e.target.value)
                                        });
                                    }}

                                />
                                </>
                            ) : (
                                <>
                                <div className='score-display'>
                                    <span>{`${getHomePrediction(m) >=0 ? getHomePrediction(m) : ''}`}</span>
                                    <span className='dash'>&ensp;&mdash;&ensp;</span>
                                    <span>{`${getAwayPrediction(m) >=0 ? getAwayPrediction(m) : ''}`}</span>
                                </div>
                                </>
                            )}
                        </div>
                        <div className='grid-item3'>
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
