
import './addExperience.css';
import {useSelector} from 'react-redux';
export default function AddExperienceModal({className}) {
  const type = useSelector(state => state.modals.addExperience);
  console.log(className)
  if (className === "AddExperienceModalWrapper")
    return (

      type && 
      <div className='AddExperienceModalWrapper'>
        <div className='AddExperienceModalContainer'>
          Add experience
          <form action="submit">
            <label htmlFor="title">Title</label>
            <input type="text" name="cheese" id="title" />
            {/* <label htmlFor="title">Title</label>
            <input type="text" name="cheese" id="title" />
            <label htmlFor="title">Title</label>
            <input type="text" name="cheese" id="title" />
            <label htmlFor="title">Title</label>
            <input type="text" name="cheese" id="title" /> */}

           </form>
        </div>
      </div>

    )

}

