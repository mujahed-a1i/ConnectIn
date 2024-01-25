import csrfFetch from "../csrf";

// Action Constants
const RECEIVE_EXPERIENCES = 'receiveExperiences';


export const receiveExperiences = (experiences) => {
  return {
    type: RECEIVE_EXPERIENCES,
    experiences,
  };
};


export const fetchAllExperiences = (userId) => async dispatch => {

  const response = await csrfFetch(`/api/users/${userId}`);
  const {experiences} = await response.json();
  dispatch(receiveExperiences(experiences));
  return response;
};


const experiencesReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {...state};

  switch(action.type){
  case RECEIVE_EXPERIENCES:
    return {...newState, ...action.experiences};
  default:
    return newState;
  }
};

export default experiencesReducer;