import "./profileBanner.css";
import userIcon from "../../../assests/userIcon/user_icon.png";
import { useState } from 'react';import {useDispatch} from 'react-redux';
import * as modalActions from '../../../../store/reducers/modals';

export default function ProfileBanner({user}) {
  const dispatch = useDispatch();

  console.log(user)


  const showProfilePicModal= (e) => {
    e.preventDefault();
    console.log("clicked");
    dispatch(modalActions.showModal("profilePicModal"));

  };

  return (
    <>
      <div className="profilePicWrapper">
        <img className="profilePic" src={user.profilePic || userIcon} alt="User Post Icon" 
          onClick={showProfilePicModal} width="152" height="152" 
        />
      </div>
      <h1>{user.firstName}</h1>
    </>
  );



}