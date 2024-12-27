import { useContext } from 'react'
import FlashTitle from '../common/FlashTitle'
import CompetitionSelection from '../components/CompetitionSelection'
import { AppContext } from '../contexts/AppContext';


const Homepage = () => {
  const { selectedCompetition, user: currentUser, userToken, comp } = useContext(AppContext);

  console.log(`Homepage - currentUser: `+ JSON.stringify(currentUser))
  console.log(`Homepage - token: `+ userToken)
  console.log(`Homepage - selectedCompetition: ` + JSON.stringify(comp))


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