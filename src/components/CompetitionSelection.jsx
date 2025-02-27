import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import useApp from '../hooks/useApp'


// Manages the selection of competition and sets this value in state
// Parent component (Homepage) manages the selectedCompetition state
const CompetitionSelection = () => {
  const { competitions, selectedCompetition, setSelectedCompetition } = useApp();
  const nav = useNavigate();


  // If selectedCompetition is null:
  // Set as the first element of competitions[0]
  // i.e. "Premier League" is the default competition
  // if (selectedCompetition == null) {
  //   selectedCompetition(competitions[0]);
  // }

  const handleCompSelection = useCallback(e => {
    let compName = e.target.value;
    let selectedComp;
    competitions.map((comp) =>
      comp.name === compName ?
        selectedComp = comp : null
    )

    setSelectedCompetition(selectedComp)
      console.log(selectedCompetition)
      if (selectedCompetition) {
        nav(`/play/competition/${selectedCompetition.id}`);
      }

    }, [competitions, selectedCompetition, setSelectedCompetition, nav]);




  return (
    <>
    <div className='compDropDown'>
        <label>Choose Competition: </label>
        <select
          name='competition'
          id='competition'
          onChange={handleCompSelection}
        >
            {competitions.map((comp, i) =>
                comp.active?
                    <option value={comp.name} key={i}>{comp.name}</option>
                    :
                    null
            )};
        </select>

    </div>
    </>
  )
}

export default CompetitionSelection;