import "./createPostBox.css";
import userIcon from "../assests/userIcon/user_icon.png" ;
import { useDispatch } from 'react-redux';
import * as modalActions from '../../store/reducers/modals';


export default function CreatePostBox() {
  const dispatch = useDispatch();

  const handleShowModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal());
  };

  return (
    <div className="createPostBarWrapper">
      <img className="feedUserIcon" src={userIcon} alt="User Post Icon" width="42" height="42"/>
      <button className="feedCreatePostButton" onClick={handleShowModal}>Start a post</button>
    </div>
  );
}