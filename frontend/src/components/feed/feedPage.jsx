import "./feedPage.css";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import NavigationBar from "../navigationBar/navigationBar";
import { useSelector } from 'react-redux';
import CreatePostBox from "./creatPostBox";
// import Modal from "./modal";
import PostIndex from "./post/postIndex";
import * as postsActions from "../../store/reducers/posts"


export default function FeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.session.user);
  // const {type} = useSelector(state => state.modals);
  // const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    
    // Other actions based on the changes in currentUser or type

  }, [currentUser, navigate]);

  

  useEffect(() => {
    dispatch(postsActions.fetchAllPosts());
  }, [dispatch]);
  if (!currentUser) return <Navigate to="/" replace={true} />;
  
  return (
    <div className="feedPage">
  
     
      <div className="feedNavigationWrapper">
        <NavigationBar/>
      </div>
      
      
      <div className="postCRUDWrapper">
        <div className="feedCreatePostBoxWrapper">
          <CreatePostBox />
          <br/><br />
          <PostIndex />
        </div>
      </div>
    </div>
  );
}