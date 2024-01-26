

import "./postIndexItem.css";
import { useDispatch, useSelector} from 'react-redux';
import * as userActions from "../../../store/reducers/users";
import {useNavigate} from "react-router-dom"
import { useEffect, useState} from "react";
import userIcon from "../../assests/userIcon/user_icon.png" ;
import dots from "../../assests/icons/3dots.png";
import PostSettingsDropDown from "./postSettingsDropdown";
import EditModal from  "../modals/editModal";

export default function PostIndexItem({post}) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.users[post.userId])
  const canEdit = (currentUser.id === post.userId);
  const author = post.author
  const navigate = useNavigate()
  // console.log(author);

  useEffect(() => {
    dispatch(userActions.fetchUser(post.userId))
  }, [dispatch, post.userId])
  // useEffect(() => {
  //   if (post.id) {
  //     dispatch(fetchOnePost(post.id));
  //   }
  // }, [dispatch, post.id]); // Add post.userId to the dependency array
  
  // console.log(currentPost);

  // console.log(user)
  // if (user.profilePic){
  //   console.log(user.profilePic)
  // }



  const handleSettingsDropDown = (e) => {
    e.preventDefault();
    setVisible(!visible);
    if (visible === true) {
      return setVisible(false);
    }
  };

  const handleProfilePage = (e) => {
    e.preventDefault()
    navigate(`/profile/${post.userId}`)
  }


  if (author) {

  
    return (
      <div className="postWrapper">
        <div className='editModalWrapper'>
          {<EditModal post={post} visible={visible} setVisible={setVisible}/> }
        </div>
        {visible && <div className="postSettingsDropDownWrapper">
          <PostSettingsDropDown post={post} visible={visible} setVisible={setVisible} />
        </div>}
        

        
        <div className="feedPostUserInfo2">
          <img className="feedUserIcon" src={user && user.profilePic ? user.profilePic : userIcon} 
            alt="User Post Icon" width="48" height="48"
            onClick={handleProfilePage}
            /> 
          <h1 className="feedPostAuthorName">{`${author.firstName}  ${author.lastName}`}</h1> 
          { canEdit && <div className="currentUserDotsWrapper"  onClick={handleSettingsDropDown}>
          <img className="currentUserDots" 
            src={dots} alt="3 dots" />
        </div> }
        </div>

        <p className="feedPostDescription">{post.description}</p>

        { post.photo && 
        <img src={post.photo} className="PostImage" alt="image" width='550' height="550"/>
        }
    
      
      </div> 
    );
  }
}