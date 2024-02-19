import ExperienceIndexItem from "./experienceIndexItem";
// import * as experiencesAction from '../../../../store/reducers/experiences';
// import { useEffect } from "react";
import {useDispatch} from 'react-redux';
// import pencilIcon from '../../../assests/icons/edit-pencil.png';
import plusIcon from '../../../assests/icons/plusIcon.png';
import * as modalActions from '../../../../store/reducers/modals';
import ExperienceModal from "../../modals/experienceModal";
// import {useParams} from 'react-router-dom'


import "./experienceIndex.css";
export default function ExperienceIndex({experiences, className}){
  const dispatch = useDispatch();
  

  // const experiences = useSelector(state => state.experiences);
  // console.log(experiences)
  const handleShowAddExperienceModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("addExperience"));
    // console.log('clicked');
  };  

  
  // useEffect(() => {
  //   dispatch(experiencesAction.fetchAllExperiences(userId));
  // }, [dispatch, userId]);

  let experiencesArray = Object.values(experiences);
  // experiencesArray = (experiencesArray.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)));
  experiencesArray = experiencesArray.sort((a, b) => {
    const startDateComparison = new Date(b.startDate) - new Date(a.startDate);
    if (startDateComparison !== 0) {
    // If start dates are different, sort by start date
      return startDateComparison;
    } else {
    // If start dates are the same, sort by end date
      return new Date(b.endDate) - new Date(a.endDate);
    }
  });
  if (className === "profileExperienceIndex" && !!experiences) {
    return (
      <div className={className}>
        <ExperienceModal className="experienceModalWrapper"/>
        <div className="profileExperienceIndexHeader">
          <h1> Experience </h1>
 
          <div className="profileExperienceIndexHeaderButtons">
            <img className="profileExperienceAddButton" src={plusIcon} 
              onClick={handleShowAddExperienceModal} alt="Add Experience"/>
            {/* <img className="profileExperienceEditButton" src={pencilIcon} alt="Edit Experience"  width='24' height='24'/> */}
          </div>
          
        </div>
       
        
        
        {experiencesArray.map((experience) => (
          < ExperienceIndexItem key={experience.id} experience={experience} className="profileExperienceIndexItem"/>
        ))}
      </div>
    );
  }
}
