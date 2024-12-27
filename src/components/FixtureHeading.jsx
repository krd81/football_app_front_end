import { AppContext } from '../contexts/AppContext';
import { useContext } from 'react'
import { timeFormatter } from '../functions/dateTimeFormatter'


// Displays either the match status (if in play or finished) or the scheduled kick off time
function FixtureHeading ({ match }) {
    const { results } = useContext(AppContext);
    const m = match;
    const allResults = results;



    const result = allResults.find(result => result.fixture_id === m.fixture_id);
    // result.status indicates whether game is in play, not started or completed
    const status = result?.status;

    switch (status) {
        case 'FINISHED': {
            return (
                <>
                    <span className='ft-tag'>
                        Full time
                    </span>
                </>
            )
        };
        case 'IN PLAY':
        case 'HALF TIME BREAK':
        case 'ADDED TIME':
        case 'INSUFFICIENT DATA': {
            return (
                <span className='live-tag'>
                    Live
                </span>

            )
        };
        default: {
            return (
                <>
                    <span className='default-tag'>
                        Kick-off
                    </span>
                    <span className='time-tag'>
                        {timeFormatter(result?.scheduled) || timeFormatter(m?.time) ||'none'}
                    </span>
                </>
            )
        };
    };

};

export default FixtureHeading;