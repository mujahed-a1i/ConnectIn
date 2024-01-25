import ExperienceIndexItem from "./experienceIndexItem";
import * as experiencesAction from '../../../../store/reducers/experiences';
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import pencilIcon from '../../../assests/icons/edit-pencil.png';
import plusIcon from '../../../assests/icons/plusIcon.png';
import * as modalActions from '../../../../store/reducers/modals';
import ExperienceModal from "../../modals/experienceModal";
// import {useParams} from 'react-router-dom'


import "./experienceIndex.css";
export default function ExperienceIndex({userId, className}){
  const dispatch = useDispatch();
  const experiences = useSelector(state => state.experiences);

  const handleShowAddExperienceModal = (e) => {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    dispatch(modalActions.showModal("addExperience"));
    console.log('clicked')
  };  

  
  useEffect(() => {
    dispatch(experiencesAction.fetchAllExperiences(userId));
  }, [dispatch, userId]);
  let experiencesArray = Object.values(experiences);
  experiencesArray = (experiencesArray.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)));
  
  if (className === "profileExperienceIndex" && !!experiences) {
    return (
      <div className={className}>
        <ExperienceModal className="experienceModalWrapper"/>
        <div className="profileExperienceIndexHeader">
          <h1> Experience </h1>
 
          <div className="profileExperienceIndexHeaderButtons">
            <img className="profileExperienceAddButton" src={plusIcon} 
              onClick={handleShowAddExperienceModal} alt="Add Experience"/>
            <img className="profileExperienceEditButton" src={pencilIcon} alt="Edit Experience"  width='24' height='24'/>
          </div>
          
        </div>
       
        
        
        {experiencesArray.map((experience) => (
          < ExperienceIndexItem key={experience.id} experience={experience} className="profileExperienceIndexItem"/>
        ))}
      </div>
    );
  }
}
