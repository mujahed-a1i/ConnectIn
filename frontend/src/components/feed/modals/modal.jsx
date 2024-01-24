import "./modal.css";
import { useState, useEffect } from 'react';

import userIcon from "../../assests/userIcon/user_icon.png";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import * as modalsAction from '../../../store/reducers/modals';
import closeButton from "../../assests/icons/closeIcon1.svg";
import  * as postAction from '../../../store/reducers/posts';

export default function Modal() {
  const [photoFile, setPhotoFile] = useState (null);
  const [description, setDescription] = useState('')
  const dispatch = useDispatch();
  // const currentUser = useSelector(state => state.session.user)
  let firstName = useSelector((state) => state.session.user.firstName);
  let lastName = useSelector((state) => state.session.user.lastName);
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  


  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   const dropdownWrapper = document.querySelector(".feedPostModal");

    //   if (dropdownWrapper && !dropdownWrapper.contains(event.target)) {
    //     dispatch(modalsAction.hideModal());
    //   }
    // };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        dispatch(modalsAction.hideModal("createPost"));
      }
    };
    // document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      // document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dispatch]);


  const handleSubmitPost = (e) => {
    e.preventDefault();
    // const post = {
    //   description: description,
    // };

    const formData = new FormData();
    formData.append('post[description]', description);
    if (photoFile) {
      formData.append('post[photo]', photoFile);
    }
    for (const pair of formData.entries()) {
      console.log(pair[0]); // This will log the key
    }
    // console.log(photoFile);
    dispatch(modalsAction.hideModal("createPost"));
    dispatch(postAction.createPost(formData));
    setDescription("");
  };

  
  const handleCloseModal = (e) => {
    e.preventDefault();
    dispatch(modalsAction.hideModal("createPost"));
  };

  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setPhotoFile(file);
  };




  return (
    <dialog open className="feedPostModal" onSubmit={handleSubmitPost}>
      <div className="feedPostUserInfo">
        <img className="feedModalUserIcon" src={userIcon} alt="User Post Icon" width="56" height="56"/>
        <h1 className="feedPostName">{`${firstName}  ${lastName}`}</h1>
        <img className="feedCloseButton" src={closeButton} onClick={handleCloseModal} height='20' width='20' alt="close" />
      </div>
      <form className="feedPostModalForm" action="submit">
        <label htmlFor="postDescription"></label>
        <textarea id="postDescription" className="feedPostModalTextBox" 
          type="textarea" placeholder="What do you want to talk about?" 
          maxLength='3000' value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={handleFile} />
        <button className="feedModalPostButton" 
          type="submit"
          disabled={description.length === 0} >
            Post 
        
        </button>
      </form>
    </dialog>
  );
  

  // if ()
  
}
