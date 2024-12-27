function FinalScore ({ match, home, away, score, status }) {

    return (
        <>
            <div className='grid-item4'>
                Final Score
            </div>
            <div className='grid-item5'>
                <div className='score-display'>
                    <span className='result-disc'>
                        <span className='numeric-value'>{`${home >=0 ? home : '0'}`}</span>
                    </span>
                    <span className='dash'>&ensp;&mdash;&ensp;</span>
                    <span className='result-disc'>
                        <span className='numeric-value'>{`${away >=0 ? away : '0'}`}</span>
                    </span>
                </div>
            </div>
        </>
    )
};

export default FinalScore;