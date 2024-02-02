import "./editModal.css";
import { useState, useEffect } from 'react';
import userIcon from "../../assests/userIcon/user_icon.png";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import * as modalsAction from '../../../store/reducers/modals';
import closeButton from "../../assests/icons/closeIcon1.svg";
import  * as postAction from '../../../store/reducers/posts';
// import {useNavigate} from "react-router-dom";

export default function EditModal({post, visible, setVisible}) {
  const currentUser = useSelector(state => state.session.user);
  // const currentPost = useSelector(state => state.posts[post.id]);
  const currentPost = useSelector(state => state.posts[post.id]);
  const type = useSelector(state => state.modals[post.id])
  // console.log(currentPost)


 
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
 
  let firstName = useSelector((state) => state.session.user.firstName);
  let lastName = useSelector((state) => state.session.user.lastName);
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownWrapper = document.querySelector(".feedEditPostModal");

      if (dropdownWrapper && !dropdownWrapper.contains(event.target)) {
        dispatch(modalsAction.hideModal());
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        dispatch(modalsAction.hideModal("editModal"));
        setVisible(false);
      }
    };
    // document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dispatch, visible, setVisible]);


  const handleSubmitPost = (e) => {
    e.preventDefault();
    const editedPost = {
      id: post.id,
      description: description,
    };
    dispatch(modalsAction.hideModal(post.id));
    setVisible(false);
    dispatch(postAction.updatePost(editedPost));
  };
  const handleCloseModal = (e) => {
    e.preventDefault();
    dispatch(modalsAction.hideModal(post.id));
    setVisible(false);
  };
  if (currentUser.id === currentPost.userId && type === post.id) {
    return (
      <dialog open className="feedEditPostModal">
        <div className="feedEditPostUserInfo">
          <img className="feedEditModalUserIcon" src={userIcon} alt="User Post Icon" width="56" height="56"/>
          <h1 className="feedEditPostUserName">{`${firstName}  ${lastName}`}</h1>
          <img className="feedEditCloseButton" src={closeButton} onClick={handleCloseModal} height='20' width='20' alt="close" />
        </div>
        <form className="feedEditPostModalForm" action="submit">
          <label htmlFor="postDescription"></label>
          <textarea id="postDescription" className="feedEditPostModalTextBox" 
            type="textarea" 
            maxLength='3000' defaultValue={post.description}
            onChange={(e) => setDescription(e.target.value )}
        
          />
          <button className="feedEditModalPostButton" 
            onClick={handleSubmitPost} type="submit"
            disabled={description.length === 0} >
              Save 
          </button>
        </form>
      </dialog>
    );
  
  }

  

  
}
