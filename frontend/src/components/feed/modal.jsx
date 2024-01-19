import "./modal.css";
import { useParams } from 'react-router-dom';
import userIcon from "../assests/userIcon/user_icon.png";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import * as modalsAction from '../../store/reducers/modals';

export default function Modal() {

  const dispatch = useDispatch();
  let username = useSelector((state) => state.session.user.username);
  username = username.charAt(0).toUpperCase() + username.slice(1);

  const params = useParams();

  const handleCloseModal = (e) => {
    e.preventDefault();
    dispatch(modalsAction.hideModal());

  };


  if (params.feed === 'feed') {
    return (
      <dialog open className="feedPostModal">
        <div className="feedPostUserInfo">
          <img className="feedUserIcon" src={userIcon} alt="User Post Icon" width="56" height="56"/>
          <h1>{username}</h1>
        </div>
        <form className="feedPostModalForm" action="submit">
          <label htmlFor="postDescription"></label>
          <textarea id="postDescription" className="feedPostModalTextBox" type="textarea" placeholder="What do you want to talk about?"/>
        </form>
  
          <button className="feedPostModalButton" onClick={handleCloseModal}>close</button>

      </dialog>
    );
  }
  
}
