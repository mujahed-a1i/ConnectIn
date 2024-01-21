

import "./postIndexItem.css"
import { useDispatch, useSelector} from 'react-redux'
import {  fetchAllUsers } from "../../../store/reducers/users";
import { useEffect } from "react";
import userIcon from "../../assests/userIcon/user_icon.png" ;


export default function PostIndexItem({post}) {

  const dispatch = useDispatch();

  // console.log(post);
  // console.log(post.userId);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch, post.userId]); // Add post.userId to the dependency array
  const users = useSelector(state => state.users);
  // console.log(users);
  const author = users[post.userId];
  // console.log(author)
  

  return (
    author && <div className="postWrapper">
      <div className="feedPostUserInfo">
        <img className="feedUserIcon" src={userIcon} alt="User Post Icon" width="48" height="48"/>
        <h1 className="feedPostAuthorName">{`${author.firstName}  ${author.lastName}`}</h1> 
      </div>
      <p className="feedPostDescription">{post.description}</p>

    </div> 
  );
}