import NavigationBar from "../navigationBar/navigationBar";
import LoginForm from "../session/loginForm";
import "./splashPage.css";
import linkedIn from "../assests/linkedinSplashPic.svg" ;
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SplashPage() {
  let currentUser = useSelector((state) => state.session.user);
  if (currentUser !== null) {
    return (
      <Navigate to="/feed" replace={true} />
    );
  }
  return (
    <div className="homePage">
      < NavigationBar />
      <div className="loginAndPicture">
        <div className="loginWrapper">
          <div className="sloganWrapper">
            <h1 className='slogan'>Welcome to your professional community</h1>
          </div>
          <br /><br />
          <LoginForm />
        </div>
        <img className="linkedin" src={linkedIn} alt="splashPhoto" />
      </div>
    

    </div>
  );

}