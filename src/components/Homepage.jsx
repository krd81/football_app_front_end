import { useContext } from 'react'
import FlashTitle from '../common/FlashTitle'
import CompetitionSelection from '../common/CompetitionSelection'
import { AppContext } from '../authentication/AppContext';


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
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="orange"/>
  <path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="10" fill="none"/>
</svg>

    </>
  )
}

export default Homepage