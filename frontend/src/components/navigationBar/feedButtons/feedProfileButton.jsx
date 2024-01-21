import userIcon from "../../assests/userIcon/user_icon.png" ;
import userIcon20 from "../../assests/userIcon/icons8-user-profile-20.png" ;
import dropDownTriangle from "../../assests/icons/dropdownTriangle.png";
import "./feedProfileButton.css";
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import * as sessionActions from "../../../store/reducers/session";
export default function FeedProfileButton() {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [visible, setVisible] = useState(false);
  console.log(currentUser);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownWrapper = document.querySelector(".feedUserIconWrapper");

      if (dropdownWrapper && !dropdownWrapper.contains(event.target)) {
        setVisible(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
    // navigate('/');
  };
 
  const handleDropDown = e => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className="feedUserIconWrapper" onClick={handleDropDown}>
      <img className="feedUserIcon2" src={userIcon} alt="User Post Icon" />
      <div>
        <div className="MeWrapper">
          <p className="me">Me</p>
          <img src={dropDownTriangle} alt="Drop Down Triangle"  width="10" height="5" />
        </div>
        { visible &&
          <ul className="dropDownUserInfoWrapper">
            <li className="dropDownUserInfo">
              <img className="dropDownUserIcon" src={userIcon} alt="User Post Icon" width="50" height="50"/>
              <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
            </li>
            <li className="feedSignOut">
              <Link  to='/' onClick={handleLogout}>
                Sign Out
              </Link>
            </li>
          </ul>
        }
  
      </div>
    </div>
    
  );
}