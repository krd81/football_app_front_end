import { React, useContext, useState } from 'react'
import FlashTitle from '../common/FlashTitle'
import CompetitionSelection from '../common/CompetitionSelection'
import { AppContext } from '../authentication/AppContext';


const Homepage = () => {
  const { competitions, competition } = useContext(AppContext);
  const [selectedCompetition, setSelectedCompetition] = useState(competitions[0][0]); // Sets the first element of competitions[0] i.e. "Premier League" as the default competition
  document.title = 'Home';

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
            }}
            >
          </CompetitionSelection>
        </div>
        <div>
          <CompetitionPanel comp={selectedCompetition.name}>
          </CompetitionPanel>
        </div>
        <div><h2> </h2></div>
    </div>
    </>
  )
}

function CompetitionPanel({ comp }) {
  return (
    <>
      <div><h1 className='paytone-one-h1'>{comp}</h1></div>
      <div><h2 className='paytone-one-h2'></h2></div>
    </>
  )
}

export default Homepage