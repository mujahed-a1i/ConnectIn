import "./createPostBox.css";
import userIcon from "../assests/userIcon/user_icon.png" ;
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../store/reducers/modals';
import Modal from "././modals/modal";


export default function CreatePostBox() {
  const dispatch = useDispatch();
  const type = useSelector(state => state.modals.createPost);

  const handleShowModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("createPost"));
  };

  return (
    
    <div className="createPostBarWrapper">
      {type && <div className="createPostBoxModal"> 
        <Modal /> 
      </div> }
      <img className="feedUserIcon" src={userIcon} alt="User Post Icon" width="42" height="42"/>
      <button className="feedCreatePostButton" onClick={handleShowModal}>Start a post</button>
    </div>
  );
}