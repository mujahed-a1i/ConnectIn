import userIcon from "../../assests/userIcon/user_icon.png" ;
import dropDownTriangle from "../../assests/icons/dropdownTriangle.png";
import "./feedProfileButton.css";
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import githubIcon from "../../assests/icons/github.png";
import linkedinIcon from "../../assests/icons/linkedinlogo.png";


// import { Link} from "react-router-dom";
//
import { logoutUser } from "../../../store/reducers/session";
export default function FeedProfileButton() {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   const dropdownWrapper = document.querySelector(".feedUserIconWrapper");

    //   if (dropdownWrapper && !dropdownWrapper.contains(event.target)) {
    //     setVisible(false);
    //   }
    // };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };

    // document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      // document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleToGithub = e => {
    e.preventDefault();
    // e.stopPropagation(); // Add this line to stop event propagation
    window.open("http://github.com/mujahed-a1i/ConnectIn", '_blank');
  };
  const handleToLinkedIN = e => {
    e.preventDefault();
    // e.stopPropagation(); // Add this line to stop event propagation
    window.open("http://linkedin.com/in/mujahed-ali-957276169/", '_blank');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
  };

  const handleToUserProfile = e => {
    e.preventDefault();
    navigate(`/profile/${currentUser.id}`);
  };
 
  const handleDropDown = e => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className="feedUserIconWrapper" onClick={handleDropDown}>
      {currentUser && <img className="navUserIcon" src={currentUser.profilePic || userIcon} alt="User Post Icon" /> }
      {!currentUser && <img className="navUserIcon2" src={userIcon} alt="User Post Icon" />}
      <div>
        <div className="MeWrapper">
          <p className="me">Me</p>
          <img src={dropDownTriangle} alt="Drop Down Triangle"  width="10" height="5" />
        </div>
        { visible &&
          <div className="dropDownUserInfoWrapper">
            <div className="dropDownUserInfo">
              <img className="dropDownUserIcon" src={currentUser.profilePic || userIcon} alt="User Post Icon" width="50" height="50"/>
              <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
            </div>
            <div>
              <button className="userProfileButton" onClick={handleToUserProfile}>
                User Profile
              </button>
            </div>
   
            <div className="mylinksWrapper">
              <img src={githubIcon} className="dDownMyLinksIcons2"alt="" onClick={handleToGithub} />
  
              <img src={linkedinIcon} className="dDownMyLinksIcons" alt=""onClick={handleToLinkedIN} />
            </div>
            

            <hr />
            <div>
              <button className="feedSignOut" onClick={handleLogout}>
                Sign Out
              </button>

            </div>
          </div>
        }
  
      </div>
    </div>
    
  );
}