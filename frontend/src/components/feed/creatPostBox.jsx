import "./createPostBox.css";
import userIcon from "../assests/userIcon/user_icon.png" ;
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../store/reducers/modals';
import Modal from "././modals/modal";
import { useNavigate } from 'react-router-dom'


export default function CreatePostBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  // console.log(currentUser.id)
  const type = useSelector(state => state.modals.createPost);

  const handleShowModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("createPost"));
  };

  const handleProfilePage = (e) => {
    e.preventDefault()
    navigate(`/profile/${currentUser.id}`);
  }

  return (
    
    <div className="createPostBarWrapper">
      {type && <div className="createPostBoxModal"> 
        <Modal /> 
      </div> }
      {<img className="feedUserIcon" src={currentUser.profilePic || userIcon} 
       onClick={handleProfilePage} alt="User Post Icon" width="42" height="42"/>}
      {!currentUser && <img className="feedUserIcon2" src={userIcon} alt="User Post Icon"  width="42" height="42"/> }

      <button className="feedCreatePostButton" onClick={handleShowModal}>Start a post</button>
    </div>
  );
}