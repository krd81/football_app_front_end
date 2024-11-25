import { React, useContext } from 'react';
import { AppContext } from '../authentication/AppContext';


const CompetitionSelection = ({ onSelect }) => {
  const { competitions } = useContext(AppContext);


  competitions[0].map((comp, i) =>
    console.log(i+" "+comp.name)
  )



  return (
    <>
    <div className='compDropDown'>
        {/* <label htmlFor='competition'>Choose Competition: </label> */}
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