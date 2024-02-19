import "./experienceIndexItem.css";
import editDots from "../../../assests/icons/3dots.png";
import { useState } from "react";
import {useSelector} from "react-redux";
import ExperienceDropDown from "./experienceDropDown";
import ExperienceModal from "../../modals/experienceModal";


const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December",
];

export default function ExperienceIndexItem({experience, className}){
  // console.log(experience)
  // console.log((experience.title));
  // const editVisible = useSelector(state => state.modals.editExperience);
  // console.log("Editing Experience:", experience);


  const start = new Date(experience.startDate);
  const currentUser = useSelector(state => state.session.user);
  const editVisible = useSelector(state => state.modals[experience.id]);

  const canEdit = (currentUser.id === experience.userId);
  const [visible, setVisible] = useState(false);
  const startMonthInWords = monthNames[start.getMonth()];
  const startYear = start.getFullYear();

  const handleExperienceDropDown = (e) => {
    e.preventDefault();
    // console.log(experience)
    setVisible(!visible);
    if (visible === true) {
      return setVisible(false);
    }
    // console.log(experience)
  };



  const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 1 : months;
  };


  let end;
  let endMonthInWords;
  let endYear;
  let diff;

  if (experience.endDate) {
    end = new Date(experience.endDate);
    endMonthInWords = monthNames[end.getMonth()];
    endYear = end.getFullYear();
    diff = monthDiff(start, end);
  }

  // console.log(diff);

  const startDate = `${startMonthInWords} ${startYear}`; 
  const endDate = `${endMonthInWords} ${endYear}`; 


  if (className === "profileExperienceIndexItem") {
    return (
      <div className={className}>
        
        {editVisible && <ExperienceModal className="editExpModalWrapper" experience={experience}/>}

        <div className="experienceInfoWrapper">
          {visible && <div className="experienceDropDownWrapper">
            <ExperienceDropDown experience={experience} visible={visible} setVisible={setVisible} />
          </div>}
          {canEdit && <img src={editDots} className="experienceCRUDDots" alt="dots" onClick={handleExperienceDropDown} />}

          <p className="profileExperienceTitle">{experience.title}</p>
          <p className="profileExperienceCompanyName">{experience.companyName}</p>
          {(!!experience.endDate === true) &&
            <p className="profileExperienceDates">
              {`${startDate} to ${endDate} · ${diff} mos`}
            </p>
          }
          {(!!experience.endDate === false) &&
            <p className="profileExperienceDates">
              {`${startDate} to ${endDate}`}
            </p>
          }
        </div>


        <hr />
      </div>
    );

  }
}