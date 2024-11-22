import { React, useContext } from 'react'
import FlashTitle from '../common/FlashTitle'
import CompetitionSelection from '../common/CompetitionSelection'
import { AppContext } from '../authentication/AppContext';


const Homepage = () => {
  const { user } = useContext(AppContext);

  return (
    <>
    <div className='homepage'>

        <div>< FlashTitle/></div>
        <div><CompetitionSelection /></div>
        <div><h1 className='paytone-one-h1'>2024/2025 Season</h1></div>
        <div><h2 className='paytone-one-h2'>{user.firstName}</h2></div>
        <div><h2 className='paytone-one-h2'>Current game week</h2></div>
        <div><h2> </h2></div>
    </div>
    </>
  )
}

export default Homepage