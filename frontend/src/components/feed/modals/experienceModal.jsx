
import './experienceModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../../store/reducers/modals';
import {createExperience, updateExperience} from '../../../store/reducers/experiences';
import closeIcon from '../,,/../../assests/icons/closeIcon1.svg';


export default function ExperienceModal({className, experience}) {

  let currentExp;
  const experiences = useSelector(state => state?.experiences);
  if (experience?.id === useSelector(state => state.modals[experience?.id])) {
    currentExp = experiences[experience?.id]; 
  }
  // console.log(currentExp);
  // const experienceId = Object.values(useSelector(state => state.modals.ex))[0]
  // console.log(experienceId)
  const editVisible = useSelector(state => state.modals[currentExp?.id]);

  // let currentExp = experiences[experienceId]
  const [title, setTitle] = useState(currentExp?.title || '');
  const [companyName, setCompanyName] = useState(currentExp?.companyName || '');
  const [industry, setIndustry] = useState(currentExp?.industry || '');
  const [location, setLocation] = useState(currentExp?.location || '');
  const [description, setDescription] = useState(currentExp?.description || '');
  const [startDate, setStartDate] = useState(currentExp?.startDate || '');
  const [endDate, setEndDate] = useState(currentExp?.endDate || '');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const createVisible = !!useSelector(state => state.modals.addExperience);
  // console.log(createVisible)
  // console.log("Initialized State:", { title, companyName, industry, location, description, startDate, endDate });

  // const editVisible = useSelector(state => state.modals.editExperience);



  const handleCloseExperienceModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal("addExperience"));
    // dispatch(modalActions.hideModal(currentExp?.id));
    setErrors([]);
    setTitle("");  
    setCompanyName("");
    setIndustry("");
    setLocation("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };
  const handleCloseEditExpModal = (e) => {
    e.preventDefault();
    // dispatch(modalActions.hideModal("editExperience"));
    dispatch(modalActions.hideModal(currentExp?.id));
    setErrors([]);
    setTitle("");  
    setCompanyName("");
    setIndustry("");
    setLocation("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const handleSubmitExperience =  e => {
    e.preventDefault();
    // dispatch(modalActions.hideModal("addExperience"));
    const experience = {
      title,
      companyName,
      industry,
      location,
      description,
      startDate,
      endDate: endDate || "",
    };
    return dispatch(createExperience(experience))
      .then(() => {
        dispatch(modalActions.hideModal("addExperience")); // Dispatch hide modal action if there are no errors
        setErrors([]);
        setTitle("");  
        setCompanyName("");
        setIndustry("");
        setLocation("");
        setDescription("");
        setStartDate("");
        setEndDate("");
      })
      .catch(
        async (res) => {
          let data;
          try {
            // .clone() essentially allows you to read the response body twice
            data = await res.json();
            
          } 
          catch (error){


            
            data = await res.text(); // Will hit this case if the server is down
          }
          // if (!data?.errors) 
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
  

    
    // try {
    //   await dispatch(createExperience(experience));
    //   await dispatch(modalActions.hideModal("addExperience"));
    // } catch (error) {
    //   console.error("Error creating experience:", error);
    // // Handle error, show error message, etc.
    // }

  };

  const handleEditExperience =  e => {
    e.preventDefault();
    // dispatch(modalActions.hideModal("addExperience"));
    const exp = {
      id: currentExp.id,
      title,
      companyName,
      industry,
      location,
      description,
      startDate,
      endDate,
    };
    return dispatch(updateExperience(exp))
      .then(() => {
        dispatch(modalActions.hideModal(currentExp?.id)); // Dispatch hide modal action if there are no errors
        setErrors([]);
        setTitle("");  
        setCompanyName("");
        setIndustry("");
        setLocation("");
        setDescription("");
        setStartDate("");
        setEndDate("");
      })
      .catch(
        async (res) => {
          let data;
          try {
            // .clone() essentially allows you to read the response body twice
            data = await res.json();
            
          } 
          catch (error){


            
            data = await res.text(); // Will hit this case if the server is down
          }
          // if (!data?.errors) 
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
  
  };




  if (className === "experienceModalWrapper" )
    return (

      createVisible && 
      <div className='experienceModalWrapper'>
        
        
        <div className='experienceModalContainer'>
        
          
          <h1 className='experienceTitle'>Add Experience</h1>
          <hr />
        
          <p>* Indicates required</p>
          <ul className='experienceCreateErrors'>
            {errors.map((error, index) => (
              <li key={index}>{error.message || error}</li>
            ))}
          </ul>
          <img src={closeIcon} alt="close" className="expModalcloseIcon" onClick={handleCloseExperienceModal} />
          
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

  if (className === "editExpModalWrapper" && experience)
    return (

      editVisible && 
      <div className='experienceModalWrapper'>
        
        
        <div className='experienceModalContainer'>
        
          
          <h1 className='experienceTitle'>Edit Experience</h1>
          <hr />
        
          <p>* Indicates required</p>
          <ul className='experienceCreateErrors'>
            {errors.map((error, index) => (
              <li key={index}>{error.message || error}</li>
            ))}
          </ul>
          <img src={closeIcon} alt="close" className="expModalcloseIcon" onClick={handleCloseEditExpModal} />
          
          <form className="experienceFormContainer" onSubmit={handleEditExperience} action="submit">
            <label htmlFor="title">Title*</label><br />
            <input type="text" id="title" defaultValue={currentExp?.title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Ex: Retail Sales Manager'
            />

            <label htmlFor="companyName">Company Name*</label>
            <input type="text" id="companyName" defaultValue={currentExp?.companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder='Ex: Microsoft'
            />

            <label htmlFor="industry">Industry*</label>
            <input type="text" id="industry" defaultValue={currentExp?.industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder='Technology, Information and Internet'
            />

            <label htmlFor="location">Location</label>
            <input type="text" id="location" defaultValue={currentExp?.location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='Ex: London, United Kingdom'
            />

            <label htmlFor="description">Description</label>
            <input type="text" id="description" defaultValue={currentExp?.description}
              onChange={(e) => setDescription(e.target.value)}
            />

  
            <label htmlFor="startDate">Start Date*</label>
            <input type="date" id="startDate" defaultValue={currentExp?.startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" defaultValue={currentExp?.endDate}
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

