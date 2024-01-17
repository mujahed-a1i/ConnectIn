import "./loginForm.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/reducers/session';


function LoginForm() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()

  

  // if (sessionUser) return <Navigate to="/feed" replace={true} />
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ credential, password }))
      .then(() => {
        navigate('/feed'); // Moved inside the .then() block
      }
      )
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
  }

  const handleDemo = (e) => {
    e.preventDefault()
    setCredential('demo-lition');
    setPassword('password');
    // navigate("/feed");
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrors([]);
    
  //   try {
  //     // Dispatch the login action
  //     await dispatch(sessionActions.loginUser({ credential, password }));
      
  //     // If login is successful, navigate to the desired page
  //     navigate('/feed'); // Replace '/desired-page' with the actual path you want to navigate to
  //   } catch (res) {
  //     let data;
  //     try {
  //       data = await res.clone().json();
  //     } catch {
  //       data = await res.text();
  //     }
  //     if (data?.errors) setErrors(data.errors);
  //     else if (data) setErrors([data]);
  //     else setErrors([res.statusText]);
  //     // return setErrors;
  //   }
  // }

  const handleShowPassword = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  return (
    <form>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>

      <div className="loginForm">
        <label className="placeHolder">
          <p>Email or Username</p>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
      </div>
      
      <div className="loginForm">
        <label className="placeHolder">
          <p>Password</p>
          <input
            type= {visible ? "text": "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="passwordHidden" onClick={handleShowPassword}>{visible? "Hide": "Show"}</button>
          
        </label>
      </div>
      
      <button className="loginButton" type="submit" onClick={handleSubmit}>Sign In</button>
      <button className="loginButton" onClick={handleDemo}>Demo User</button>
    </form>
  );
}

export default LoginForm;
