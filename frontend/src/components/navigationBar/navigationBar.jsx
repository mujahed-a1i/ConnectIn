import './navigationBar.css';
import { Link} from "react-router-dom";
import {useSelector} from 'react-redux';

export default function NavigationBar() {
  const currentUser = useSelector(state => state.session.user)
  return (
    <div>
      {!currentUser && <nav className='splashNavBar'>
        <Link className="title" to="/" >
          <span className='titleConnect'>Connect</span><span className='titleIn'>in</span>
        </Link>
      
        
        <ul className ='splashNavButtons'>
          <li>
            <Link className='navButtons' to='/signup'>Join Now</Link>
          </li>
          <li>
            <Link className="navButtons" to='/'>Sign In</Link>
          </li>
        </ul>
      </nav>
      }
      {currentUser && <nav className='feedhNavBar'>
        <Link className="title" to="/feed" >
          <span className='titleIn'>in</span>
        </Link>
      
        
        <ul className ='splashNavButtons'>
          <li>
            1
          </li>
          <li>
            2
          </li>
        </ul>
      </nav>
      }
    </div>
  );
}