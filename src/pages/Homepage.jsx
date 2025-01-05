import FlashTitle from '../common/FlashTitle'
import useApp from '../hooks/useApp'


const Homepage = ({ children }) => {
  const { selectedCompetition } = useApp();

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