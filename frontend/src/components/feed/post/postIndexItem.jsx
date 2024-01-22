

import "./postIndexItem.css";
import { useDispatch, useSelector} from 'react-redux';
import {  fetchAllUsers } from "../../../store/reducers/users";
import { useEffect, useState } from "react";
import userIcon from "../../assests/userIcon/user_icon.png" ;
import dots from "../../assests/icons/3dots.png";
import PostSettingsDropDown from "./postSettingsDropdown";

export default function PostIndexItem({post}) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const canEdit = (currentUser.id === post.userId);


  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch, post.userId]); // Add post.userId to the dependency array
  const users = useSelector(state => state.users);

  const author = users[post.userId];


  const handleSettingsDropDown = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };


  return (
    author && <div className="postWrapper">

      {visible && <div className="postSettingsDropDownWrapper">
        <PostSettingsDropDown post={post} visible={visible} setVisible={setVisible} />
      </div>}
      { canEdit && <div className="currentUserDotsWrapper"  onClick={handleSettingsDropDown}>
        <img className="currentUserDots" 
          src={dots} alt="3 dots" />
      </div> }

      
      <div className="feedPostUserInfo2">
        <img className="feedUserIcon" src={userIcon} alt="User Post Icon" width="48" height="48"/>
        <h1 className="feedPostAuthorName">{`${author.firstName}  ${author.lastName}`}</h1> 
      </div>


      <p className="feedPostDescription">{post.description}</p>

     

    </div> 
  );
}