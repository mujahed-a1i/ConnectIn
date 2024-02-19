
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUpForm from "./signUpForm";


export default function SignUp(){
  const navigate = useNavigate();

  let currentUser = useSelector((state) => state.session.user);
  if (currentUser) {
    navigate('/feed');
  }

  const handleSplashPage = e => {
    e.preventDefault();
    navigate("/");
  };

  return(
    <div className="signUpPage">
      <div className="signUpWrapper">
        <div className="signUpTitle" onClick={handleSplashPage}>
          <span className='signUpTitleConnect'>Connect</span><span className='signUpTitleIfy'>in</span>
        </div>
        <br /><br />
        <div className="signUpFormSloganWrapper">
          <div className="signUpSloganWrapper">
            <h1 className='signUpSlogan'>Make the most of your professional life</h1>
          </div>
          <div className="signUpFormWrapper">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>

  );
}