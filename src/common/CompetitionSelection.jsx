import { React, useContext } from 'react';
import { AppContext } from '../authentication/AppContext';

// Manages the selection of competition and sets this value in state
// Parent component (Homepage) manages the selectedCompetition state
const CompetitionSelection = ({ onSelect }) => {
  const { competitions } = useContext(AppContext);

  return (
    <>
    <div className='compDropDown'>
        <label>Choose Competition: </label>
        <select
          name='competition'
          id='competition'
          onChange={onSelect}
        >
            {competitions[0].map((comp, i) =>
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