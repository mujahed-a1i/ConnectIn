
import csrfFetch , {storeCSRFToken} from "../csrf";

// Action Types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";


// Action Creaters
const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = (userId) => {  
  return {
    type: REMOVE_USER,
    userId,
  };
};


// export const storeCSRFToken = response => {
//   const csrfToken = response.headers.get("X-CSRF-Token");
//   if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
// };

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Thunk Action Creators
export const loginUser = user => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  sessionStorage.setItem('currentUser', JSON.stringify(data.user));
  dispatch(setUser(data.user));
  return response;
};


export const logoutUser = () => async dispatch => {
  let res = await csrfFetch('/api/session', {
    method: "DELETE",
  });
  sessionStorage.setItem('currentUser', JSON.stringify(null));
  dispatch(removeUser());
  return res;
};

export const createUser = (user) => async dispatch => {
  // const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
    // body: JSON.stringify({
    //   username,
    //   email,
    //   password,
    // }),
  });
  const data = await response.json();
  sessionStorage.setItem('currentUser', JSON.stringify(data.user));
  dispatch(setUser(data.user));
  return response;
};


// Reducer

  const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const initialUser = storedUser ? storedUser : null;
  const initialState = { user: initialUser };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER:
    return { ...state, user: action.user };
  case REMOVE_USER:
    return { ...state, user: null };
  default:
    return state;
  }
};




export default sessionReducer;