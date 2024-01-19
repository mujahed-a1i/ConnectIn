import "./feedPage.css";
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import NavigationBar from "../navigationBar/navigationBar";
import { useSelector } from 'react-redux';
import CreatePostBox from "./creatPostBox";
import Modal from "./modal";


export default function FeedPage() {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.session.user);
  const {type} = useSelector(state => state.modals);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    // Other actions based on the changes in currentUser or type

  }, [currentUser, navigate]);
  if (!currentUser) return <Navigate to="/" replace={true} />;
  
  return (
    <div className="feedPage">
      {type && <div className="createPostBoxModal"> 
        <Modal /> 
      </div> }
      <div className="feedNavigationWrapper">
        <NavigationBar/>
      </div>


      <div className="postCRUDWrapper">
        <div className="feedCreatePostBoxWrapper">
          <CreatePostBox />
        </div>
        <div className="feedPostIndexWrappper"> 
          <p>Post Index</p>
        </div>
        <div className="feedPostIndex"> 
        
        </div>
      </div>

    </div>
  );
}