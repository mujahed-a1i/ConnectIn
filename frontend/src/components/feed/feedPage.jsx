import "./feedPage.css"
import { Navigate } from 'react-router-dom';
import NavigationBar from "../navigationBar/navigationBar";
import { useSelector } from 'react-redux';


export default function FeedPage () {
  let currentUser = useSelector((state) => state.session.user);

  if (!currentUser) return <Navigate to="/" replace={true} />;
  
  return (
    <div className="feedPage">
      <NavigationBar/>
      
    </div>
  )


}