import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

// Manages the selection of competition and sets this value in state
// Parent component (Homepage) manages the selectedCompetition state
const CompetitionSelection = () => {
  const { comps, setComp } = useContext(AppContext);

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
            comps[0].map((comp) =>
              comp.name === compName ?
                selectedComp = comp : null
            )
            setComp(selectedComp)
          }}
        >
            {comps[0].map((comp, i) =>
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