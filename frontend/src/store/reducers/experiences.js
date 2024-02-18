import csrfFetch from "../csrf";

// Action Constants
const RECEIVE_EXPERIENCE = 'recieveExperience';
const RECEIVE_EXPERIENCES = 'receiveExperiences';
const REMOVE_EXPERIENCE = 'removeExperience';



const removeExperience = (experienceId) => {
  return {
    type: REMOVE_EXPERIENCE,
    experienceId,
  };
};
// const receiveExperience = (experience) => {
//   return {
//     type: RECEIVE_EXPERIENCE,
//     experience,
//   };
// };

export const receiveExperiences = (experiences) => {
  return {
    type: RECEIVE_EXPERIENCES,
    experiences,
  };
};

// Thunk Action
export const fetchAllExperiences = (userId) => async dispatch => {

  const response = await csrfFetch(`/api/users/${userId}`);
  const {experiences} = await response.json();
  dispatch(receiveExperiences(experiences));
  return response;
};


export const createExperience = (newExperience) => async dispatch => {
  const response = await csrfFetch("/api/experiences", {
    method: "POST",
    body: JSON.stringify(newExperience),
    // body: JSON.stringify(newPost),
  });

  // console.log(response.json());
  const user = await response.json();
  // console.log(user.experiences)
  dispatch(receiveExperiences(user.experiences));

  // dispatch(receiveExperience(user.experiences[newExperience.id]));
  // console.log(response)
  return response;
};

export const updateExperience = (editExperience) => async dispatch => {
  const response = await csrfFetch(`/api/experiences/${editExperience.id}`, {
    method: "PUT",
    body: JSON.stringify(editExperience),
    // body: JSON.stringify(newPost),
  });

  // console.log(response.json());
  const user = await response.json();
  // console.log(user.experiences)
  dispatch(receiveExperiences(user.experiences));

  // dispatch(receiveExperience(user.experiences[newExperience.id]));
  // console.log(response)
  return response;
};

export const deleteExperience = (experienceId) => async dispatch => {
  const response = await csrfFetch(`/api/experiences/${experienceId}`, {
    method: "DELETE",
  });
  
  dispatch(removeExperience(experienceId));
  return response;
};

const experiencesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {...state};

  switch(action.type){
  case RECEIVE_EXPERIENCE:
    newState[action.review.id] = action.review;
    return newState;
  case RECEIVE_EXPERIENCES:

    return {...action.experiences};
  case REMOVE_EXPERIENCE:
    delete newState[action.experienceId];
    return newState;
  default:
    return newState;
  }
};

export default experiencesReducer;