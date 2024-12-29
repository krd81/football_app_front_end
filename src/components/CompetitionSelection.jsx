import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

// Manages the selection of competition and sets this value in state
// Parent component (Homepage) manages the selectedCompetition state
const CompetitionSelection = () => {
  const { competitions, comps, setComp, selectedCompetition, setSelectedCompetition } = useContext(AppContext);

  // If selectedCompetition is null:
  // Set as the first element of competitions[0]
  // i.e. "Premier League" is the default competition
  // if (selectedCompetition == null) {
  //   selectedCompetition(competitions[0]);
  // }

  return (
    <>
    <div className='compDropDown'>
        <label>Choose Competition: </label>
        <select
          name='competition'
          id='competition'
          onChange={e => {
            let compName = e.target.value;
            let selectedComp;
            competitions.map((comp) =>
              comp.name === compName ?
                selectedComp = comp : null
            )
            console.log(selectedComp);
            setSelectedCompetition(selectedComp)
            console.log(JSON.stringify(selectedCompetition))
          }}
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