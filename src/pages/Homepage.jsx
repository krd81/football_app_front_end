import { useContext } from 'react'
import FlashTitle from '../common/FlashTitle'
import CompetitionSelection from '../components/CompetitionSelection'
import { AppContext } from '../contexts/AppContext';


const Homepage = () => {
  const { competitions, setSelectedCompetition, selectedCompetition, currentUser, userToken, comp } = useContext(AppContext);
  // If selectedCompetition is null:
  // Set as the first element of competitions[0]
  // i.e. "Premier League" is the default competition
  if (selectedCompetition === '' || selectedCompetition == null) {
    // setSelectedCompetition(competitions[0]);
    console.log(JSON.stringify(selectedCompetition))
  };

  document.title = 'Home';

  return (
    <>
    <div className='homepage'>

        <div>< FlashTitle/></div>
        <div>
          <CompetitionSelection
            // competition = {selectedCompetition}
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