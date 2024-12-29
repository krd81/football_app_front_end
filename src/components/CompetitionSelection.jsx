import { useContext, useCallback } from 'react';
import { AppContext } from '../contexts/AppContext';


// Manages the selection of competition and sets this value in state
// Parent component (Homepage) manages the selectedCompetition state
const CompetitionSelection = () => {
  const { competitions, selectedCompetition, setSelectedCompetition } = useContext(AppContext);
  

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

  }, [competitions, selectedCompetition, setSelectedCompetition]);

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