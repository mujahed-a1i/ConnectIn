import './navigationBar.css';
import { Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import FeedProfileButton from "./feedButtons/feedProfileButton";
import githubIcon from "../assests/icons/github.png";
import linkedinIcon from "../assests/icons/linkedinlogo.png";


export default function NavigationBar() {

  let currentUser = useSelector((state) => state.session.user);
  


  if (!currentUser) {
    return (
      <nav className='splashNavBar'>
        <Link className="splashTitle" to="/" >
          <span className='splashTitleConnect'>Connect</span><span className='splashTitleIn'>in</span>
        </Link>
      
        
        <ul className='splashNavButtonWrapper'>
          <li className='splashSignUpButton'>
            <Link  to='/signup'>Join Now</Link>
          </li>
          <li className='splashSignInButton'>
            <Link  to='/'>Sign In</Link>
          </li>
        </ul>
      </nav>
    );
  }

  if (currentUser) {
    return (
      <nav className='feedNavBar'>
        <Link className="feedTitle" to="/feed" > in </Link>


        <div className ='feedNavButtons'>


          

          <div className='FeedProfileButtonWrapper'>
            <a href="http://linkedin.com/in/mujahed-ali-957276169" rel="noreferrer" target='_blank'><img src={linkedinIcon} className="myLinksIcons" alt="" /></a>
            <a href="http://github.com/mujahed-a1i/ConnectIn" rel="noreferrer" target='_blank'><img src={githubIcon} className="myLinksIcons2"alt="" /></a>
            <FeedProfileButton />
          </div>
          
        </div>
      </nav>
    );
  }

}