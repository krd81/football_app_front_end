import FlashTitle from '../common/FlashTitle'
import useApp from '../hooks/useApp'


const Homepage = ({ children }) => {
  const { competitions, setSelectedCompetition, selectedCompetition, currentUser, token } = useApp();
  // If selectedCompetition is null:
  // Set as the first element of competitions[0]
  // i.e. "Premier League" is the default competition
  // if (selectedCompetition && selectedCompetition.length > 0) {
  //   setSelectedCompetition(prevComp => prevComp);
  //   console.log(JSON.stringify(selectedCompetition))
  //   console.log(selectedCompetition?.length)
  // } else {
  //   setSelectedCompetition(competitions[0]);
  //   console.log(JSON.stringify(selectedCompetition))
  //   console.log(selectedCompetition?.length)
  // };

  document.title = 'Home';

  return (
    <>
    <div className='homepage'>

        <div>< FlashTitle/></div>
        <div>
          {children}
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