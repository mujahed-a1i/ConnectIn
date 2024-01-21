import './navigationBar.css';
import { Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import FeedProfileButton from "./feedButtons/feedProfileButton"



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
      
        <ul className ='feedNavButtons'>
          
          <div className='FeedProfileButtonWrapper'>
            <FeedProfileButton />
          </div>
          
        </ul>
      </nav>
    );
  }

}