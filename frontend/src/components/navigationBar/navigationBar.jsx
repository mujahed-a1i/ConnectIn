import './navigationBar.css';
import { Link} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import * as sessionActions from '../../store/reducers/session';
import { useSelector } from 'react-redux';



export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentUser = useSelector((state) => state.session.user);
  
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
    navigate('/');
  }


  return (
    <div>
      {!currentUser && <nav className='splashNavBar'>
        <Link className="splashTitle" to="/" >
          <span className='splashTitleConnect'>Connect</span><span className='splashTitleIn'>in</span>
        </Link>
      
        
        <ul className ='splashNavButtons'>
          <li>
            <Link className='splashNavButtons' to='/signup'>Join Now</Link>
          </li>
          <li>
            <Link className="splashNavButtons" to='/'>Sign In</Link>
          </li>
        </ul>
      </nav>
      }
      {currentUser && <nav className='feedNavBar'>
        <Link className="feedTitle" to="/feed" >
          <span className='feedTitleIn'>in</span>
        </Link>
      
        
        <ul className ='feedNavButtons'>
          <li>
            <Link to='/' onClick={handleLogout}>
              <button className="feedNavButtons">
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      }
    </div>
  );
}