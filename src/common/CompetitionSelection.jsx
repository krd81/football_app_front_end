import { React, useContext } from 'react';
import { AppContext } from '../authentication/AppContext';


const CompetitionSelection = () => {
    const { competitions } = useContext(AppContext);

  return (
    <>
    <div className='compDropDown'>
        <label htmlFor='competition'>Choose Competition: </label>
        <select name='competition' id='competition'>
            {competitions[0].map((competition, i) =>
                competition.active?
                    <option value={competition.name} key={i}>{competition.name}</option>
                    :
                    null
            )};
        </select>

    </div>
    </>
  )
}

export default CompetitionSelection;