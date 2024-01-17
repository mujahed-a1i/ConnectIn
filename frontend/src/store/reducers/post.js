import csrfFetch from "../csrf";

// Action Types
const SET_POST = "user/setPost`";
const REMOVE_POST = "user/removePost";

// Action Creater
const setPost = (post) => {
  return {
    type: SET_POST,
    post,
  }
}

// Thunk Action Creator 
export const createPost = (post) => async dispatch => {
  const response = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });

  const data = await response.json();
  dispatch(setPost(data.post));
  return response;
}



const postReducer = (state = {}, action) => {
  const newState = {...state}
  switch (action.type) {
    case SET_POST:
      newState[action.post.id] = action.post;
      return newState;
    case REMOVE_POST:
      delete newState[action.postId];
      return newState;
    default:
      return state;
  }
};

export default postReducer;