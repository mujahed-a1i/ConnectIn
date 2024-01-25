
import './experienceModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../../store/reducers/modals';
import {createExperience} from '../../../store/reducers/experiences';
import closeIcon from '../,,/../../assests/icons/closeIcon1.svg'


export default function ExperienceModal({className}) {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const type = useSelector(state => state.modals.addExperience);

  const hanldeCloseExperienceModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal("addExperience"));
    document.body.style.overflow = 'visible';
  };

  const handleSubmitExperience = async e => {
    e.preventDefault();
    dispatch(modalActions.hideModal("addExperience"));
    const experience = {
      title,
      companyName,
      industry,
      location,
      description,
      startDate,
      endDate,
    };

    try {
      await dispatch(createExperience(experience));
      dispatch(modalActions.hideModal("addExperience"));
      document.body.style.overflow = 'visible';
    } catch (error) {
      console.error("Error creating experience:", error);
    // Handle error, show error message, etc.
    }

  };




  if (className === "experienceModalWrapper")
    return (

      type && 
      <div className='experienceModalWrapper'>
        
        <div className='experienceModalContainer'>
          
          <h1 className='experienceTitle'>Add Experience</h1>
          <hr />
          <p>* Indicates required</p>
          <img src={closeIcon} alt="close" className="expModalcloseIcon" onClick={hanldeCloseExperienceModal} />

          <form className="experienceFormContainer" onSubmit={handleSubmitExperience} action="submit">
            <label htmlFor="title">Title*</label><br />
            <input type="text" id="title" value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Ex: Retail Sales Manager'
            />

            <label htmlFor="companyName">Company Name*</label>
            <input type="text" id="companyName" value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder='Ex: Microsoft'
            />

            <label htmlFor="industry">Industry*</label>
            <input type="text" id="industry" value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder='Technology, Information and Internet'
            />

            <label htmlFor="location">Location</label>
            <input type="text" id="location" value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='Ex: London, United Kingdom'
            />

            <label htmlFor="description">Description</label>
            <input type="text" id="description" value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

  
            <label htmlFor="startDate">Start Date*</label>
            <input type="date" id="startDate" value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <hr />
    
            
            <button className="experienceSubmitButton" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>

    );

}

