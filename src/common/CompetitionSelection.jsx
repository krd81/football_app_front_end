import { React, useContext } from 'react';
import { AppContext } from '../authentication/AppContext';


const CompetitionSelection = ({ competition, onSelect }) => {
    const { competitions } = useContext(AppContext);

  return (
    <>
    <div className='compDropDown'>
        {/* <label htmlFor='competition'>Choose Competition: </label> */}
        <label>Choose Competition: </label>
        <select
          name='competition'
          id='competition'
          value={competition}
          onChange={e => onSelect(e)}
        >
            {competitions[0].map((comp, i) =>
                comp.active?
                    <option value={comp} key={i}>{comp.name}</option>
                    :
                    null
            )};
        </select>

    </div>
    </>
  )
}

export default CompetitionSelection;