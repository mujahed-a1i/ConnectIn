import "./feedPage.css";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import NavigationBar from "../navigationBar/navigationBar";
import { useSelector } from 'react-redux';
import CreatePostBox from "./creatPostBox";
// import Modal from "./modal";
import PostIndex from "./post/postIndex";
import Modal from "././modals/modal";
import * as postsActions from "../../store/reducers/posts"


export default function FeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.session.user);
  const type = useSelector(state => state.modals.createPost);
  // const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    
    // Other actions based on the changes in currentUser or type

  }, [currentUser, navigate]);

  const handleProfilePage = e => {
    e.preventDefault();
    navigate(`/profile/${currentUser.id}`);
  }

  useEffect(() => {
    dispatch(postsActions.fetchAllPosts());
  }, [dispatch]);
  if (!currentUser) return <Navigate to="/" replace={true} />;
  
  return (
    <div className="feedPage">
      <div className="feedNavigationWrapper">
        <NavigationBar/>
      </div>
      {type && <div className="createPostBoxModal"> 
        <Modal /> 
      </div> }
      
      <div className="postCRUDWrapper">
        <div className="feedPageConatiner">
          
          <div className="feedUserInfoWrapper">
            <img className="userFeedBanner"src={currentUser?.profileBanner} alt="" width={225} height={60}/>
            <img className="userFeedPPic"src={currentUser?.profilePic} onClick={handleProfilePage} alt="" width={72} height={72}/>
            <div className="feedUserInfoContainer">
              <p className="feedUserFullName" onClick={handleProfilePage}>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
            </div>
          </div>
          <div className="feedCreatePostBoxWrapper">
            <CreatePostBox />
            <br/>
            <hr /><br />
            <PostIndex />
          </div>
        </div>
      </div>
    </div>
  );
}