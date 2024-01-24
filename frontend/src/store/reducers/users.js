import csrfFetch from "../csrf";

//  Action Types
const RECEIVE_USER = "receiveUser";
const RECEIVE_USERS = 'receiveUsers'


// Action Creator
const receiveUser = (user) => {
  return {
    type: RECEIVE_USER, 
    user,
  };
};

const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS, 
    users,
  };
};

export const updateUser = (updatedUser) => async dispatch => {
  const userId = updatedUser.get('id')

  const response = await csrfFetch(`/api/users/${userId}`, {
    method: "PUT",
    body: updatedUser,
  });
  
  const { user } = await response.json(); // <-- This is causing the issue
  dispatch(receiveUser(user));
  return response;
};

// Thunk Action Creator
export const fetchUser = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}`);
  const {user} = await response.json();
  dispatch(receiveUser(user));
  return response;
};

export const fetchAllUsers = () => async dispatch => {
  const response = await csrfFetch(`/api/users`);
  const users = await response.json();
  dispatch(receiveUsers(users));
  return response;
};

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {...state};
  
  switch(action.type) {
  case RECEIVE_USER:
    newState[action.user.id] = action.user;
    return newState;
  case RECEIVE_USERS:
    return {...newState, ...action.users};
  default:
    return newState;
  }
};

export default usersReducer;

