import "./modal.css";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import userIcon from "../assests/userIcon/user_icon.png";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import * as modalsAction from '../../store/reducers/modals';
import closeButton from "../assests/icons/closeIcon1.svg"
import  * as postAction from '../../store/reducers/post'

export default function Modal() {

  const [description, setDescription] = useState('')
  const dispatch = useDispatch();
  let username = useSelector((state) => state.session.user.username);
  username = username.charAt(0).toUpperCase() + username.slice(1);

  const params = useParams();


  const handleSubmitPost = (e) => {
    const post = {
      description: description,
    };

    e.preventDefault();
    dispatch(modalsAction.hideModal());
    return dispatch(postAction.createPost(post));
  };

  
  const handleCloseModal = (e) => {
    e.preventDefault();
    dispatch(modalsAction.hideModal());
  };


  if (params.feed === 'feed') {
    return (
      <dialog open className="feedPostModal">
        <div className="feedPostUserInfo">
          <img className="feedUserIcon" src={userIcon} alt="User Post Icon" width="56" height="56"/>
          <h1 className="feedPostUserName">{username}</h1>
          <img className="feedCloseButton" src={closeButton} onClick={handleCloseModal} height='20' width='20' alt="close" />
        </div>
        <form className="feedPostModalForm" action="submit">
          <label htmlFor="postDescription"></label>
          <textarea id="postDescription" className="feedPostModalTextBox" 
            type="textarea" placeholder="What do you want to talk about?" 
            maxLength='3000' value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="feedModalPostButton" onClick={handleSubmitPost} type="submit">Post</button>
        </form>
      </dialog>
    );
  }
  
}
