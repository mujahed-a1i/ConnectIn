import NavigationBar from "../navigationBar/navigationBar"
import LoginForm from "../session/loginForm"
import "./splashPage.css"
import linkedIn from "../assests/linkedinSplashPic.svg" 

export default function SplashPage() {

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
      {/* <div className="loginWrapper">
        <div className="sloganWrapper">
          <h1 className='slogan'>Welcome to your professional community</h1>
        </div>
        <br /><br />
        <LoginForm />
      </div> */}
    </div>
  )

}