import "./signUpForm.css";
// import { Navigate} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import {useNavigate} from "react-router-dom"
import * as sessionActions from '../../../store/reducers/session';

function SignUpForm() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(false);

  // if (sessionUser) return <Navigate to="/feed" replace={true} />;
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    

    const user = {
      // id: id,
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    return dispatch(sessionActions.createUser(user))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

 

  const handleShowPassword = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="signUpErrorsWrapper">
        {errors.map((error, index) => (
          <li className="signUpErrors"key={index}>{error.message || error}</li>
        ))}
      </ul>
      
      <div className="signUpForm">
        <div className="signUpForm">
          <label className="signUpPlaceHolder">
            <p>Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="signUpForm">
          <label className="signUpPlaceHolder">
            <p>Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        
        <div className="signUpForm">
          <label className="signUpPlaceHolder">
            <p>Password (6+ characters)</p>
            <input
              type= {visible ? "text": "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="passwordHidden" onClick={handleShowPassword}>{visible? "Hide": "Show"}</button>
            
          </label>
        </div>

        <div className="signUpForm">
          <label className="signUpPlaceHolder">
            <p>First Name</p>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="signUpForm">
          <label className="signUpPlaceHolder">
            <p>Last Name</p>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
      </div>
      <br />
      <button className="signUpButton" type="submit">Join</button>
    </form>
  );
}

export default SignUpForm;
