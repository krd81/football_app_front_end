import { React, useContext, useState } from 'react'
import FlashTitle from '../common/FlashTitle'
import CompetitionSelection from '../common/CompetitionSelection'
import { AppContext } from '../authentication/AppContext';


const Homepage = () => {
  const { competitions } = useContext(AppContext);
  const [selectedCompetition, setSelectedCompetition] = useState(competitions[0][0]); // Sets the first element of competitions[0] i.e. "Premier League" as the default competition
  document.title = 'Home';
  console.log(selectedCompetition.name);

  return (
    <>
    <div className='homepage'>

        <div>< FlashTitle/></div>
        <div>
          <CompetitionSelection
            // competition = {selectedCompetition}
            onSelect={e => {
              let compName = e.target.value;
              let selectedComp;
              competitions[0].map((comp) =>
                comp.name === compName ?
                  selectedComp = comp : null
              )
              setSelectedCompetition(selectedComp)
              console.log(e.target.value)
              console.log(selectedCompetition)
            }}
            >
          </CompetitionSelection>
        </div>
        <div>
          <CompetitionPanel>
          </CompetitionPanel>
        </div>
        <div><h2> </h2></div>
    </div>
    </>
  )
}

function CompetitionPanel() {
  return (
    <>
      <div><h1 className='paytone-one-h1'>2024/2025 Season</h1></div>
      <div><h2 className='paytone-one-h2'>Current game week</h2></div>
    </>
  )
}

export default Homepage