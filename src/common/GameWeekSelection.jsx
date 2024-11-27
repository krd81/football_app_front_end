import { React, useContext }  from 'react'
import { AppContext } from '../authentication/AppContext';
import '../css/Scores.css'

const GameWeekSelection = () => {
  const { selectedCompetition } = useContext(AppContext);
  document.title = 'Play';

  return (
    <>
    </>
  )
}

export default GameWeekSelection