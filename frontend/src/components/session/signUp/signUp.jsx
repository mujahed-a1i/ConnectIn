
import "./signUp.css"
import SignUpForm from "./signUpForm"

export default function SignUp(){

  return(
    <div className="signUpPage">
      <div className="signUpWrapper">
        <div className="signUpTitle">
          <span className='signUpTitleConnect'>Connect</span><span className='signUpTitleIfy'>ify</span>
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

  )
}