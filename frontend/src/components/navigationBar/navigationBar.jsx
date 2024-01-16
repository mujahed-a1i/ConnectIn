import './navigationBar.css';
import { Link} from "react-router-dom";

export default function NavigationBar() {

  return (
    <nav className='splashNavBar'>
      <Link className="title" to="/" >
        <span className='titleConnect'>Connect</span><span className='titleIfy'>ify</span>
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
  );
}