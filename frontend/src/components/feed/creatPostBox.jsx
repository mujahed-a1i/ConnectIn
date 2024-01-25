import "./createPostBox.css";
import userIcon from "../assests/userIcon/user_icon.png" ;
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../store/reducers/modals';
import Modal from "././modals/modal";


export default function CreatePostBox() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const type = useSelector(state => state.modals.createPost);

  const handleShowModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("createPost"));
    document.body.style.overflow = "hidden";
  };

  return (
    
    <div className="createPostBarWrapper">
      {type && <div className="createPostBoxModal"> 
        <Modal /> 
      </div> }
      {<img className="feedUserIcon" src={currentUser.profilePic || userIcon} alt="User Post Icon" width="42" height="42"/>}
      {!currentUser && <img className="feedUserIcon2" src={userIcon} alt="User Post Icon"  width="42" height="42"/> }

      <button className="feedCreatePostButton" onClick={handleShowModal}>Start a post</button>
    </div>
  );
}