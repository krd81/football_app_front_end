import { React, useContext } from 'react'
import '../css/Scores.css'
import { AppContext } from '../authentication/AppContext';

const Predictions = () => {
  const { fixtures } = useContext(AppContext);


  return (
    <>
    <div>
      <h1>Predictions:</h1>
    </div>
    <div className='match-list'>
      <form action="">

     {fixtures?.map((match, index) => {
        return (
          <>

          <div className='match-card' key={`1`+index} >
            <div className='predictions-text' key={`2`+index}>
              <div className='grid-container' key={`3`+index}>
              <div className='grid-item1' key={`4`+index}>
                <label htmlFor='score-predictions' key={`5`+index}>{`${match.homeName} `}</label>

              </div>
              <div className='grid-item2' key={`6`+index}>
              <input className='score-input' key={`7`+index} id={`${match.homeName}`} name='score-predictions' type='text' size="1"></input>
            &nbsp;-&nbsp;
            <input className='score-input' key={`8`+index} id={`${match.awayName}`} name='score-predictions' type='text' size="1"></input>
              </div>
              <div className='grid-item1' key={`9`+index}>

              <label htmlFor='score-predictions' key={`10`+index}>{` ${match.awayName}`}</label>
            </div>
            </div>

            </div>
              <p className='predictions-text' key={`11`+index}>{`Kick-off: ${match.time}`}</p>
              <p className='predictions-text' key={`12`+index}>{`${match.location}`}</p>
            </div>


          </>
        )
      })
    }
      </form>
      </div>
    </>
  )
}

export default Predictions