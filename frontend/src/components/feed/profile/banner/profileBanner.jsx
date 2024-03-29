import "./profileBanner.css";
import userIcon from "../../../assests/userIcon/user_icon.png";
// import { useState } from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as modalActions from '../../../../store/reducers/modals';
import profileBackground from "../../../assests/profile/profileBannerBackground.jpeg";
import editPencil from "../../../assests/icons/edit-pencil-blue.png";

export default function ProfileBanner({user}) {
  const currentUser = useSelector(state => state.session.user);
  const params = useParams();
  const dispatch = useDispatch();



  const canEdit = (currentUser.id == params.userId);
  const showProfilePicModal= (e) => {
    e.preventDefault();
    // console.log("clicked");
    dispatch(modalActions.showModal("profilePicModal"));
  };

  const showProfileBannerPicModal= (e) => {
    e.preventDefault();
    // console.log("clicked");
    dispatch(modalActions.showModal("profileBannerPicModal"));
  };

  return (
    <div className="profileBanner">
      <div className="profilePicWrapper">
        <img className="profileBackground" src={user.profileBanner || profileBackground} alt="Profile Background" 
          onClick={canEdit ? showProfileBannerPicModal : undefined}
        />

        <img src={editPencil} alt="edit banner pic" className="editPencilBanner" 
          onClick={canEdit ? showProfileBannerPicModal : undefined}
        />
        <div className="profilePicContainer">
        
          {/* <img src={editPencil} className="editPencilProfile"alt="editPencil" /> */}
          <img className="profilePic" src={user.profilePic || userIcon} alt="User Post Icon" 
            onClick={canEdit ? showProfilePicModal : undefined} width="152" height="152" 
          />
            <div className="editProfilePic">Edit Pic</div>
        </div>

      </div>
      <div className="ProfileBannerInfoWrapper">
        <h1 className="profileBannerUserName">{`${user.firstName} ${user.lastName}`}</h1>
      
      </div>
      
    </div>
  );



}