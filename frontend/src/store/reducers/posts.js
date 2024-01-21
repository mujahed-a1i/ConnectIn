import csrfFetch from "../csrf";

// Action Types
const RECEIVE_POST = "user/receivePost";
const RECEIVE_POSTS = "user/receivePosts"
const REMOVE_POST = "user/removePost";

// Action Creater
const receivePost = (post) => {
  return {
    type: RECEIVE_POST,
    post,
  };
};

const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
};

// Thunk Action Creator 
export const createPost = (newPost) => async dispatch => {
  const response = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
  });

  const {post} = await response.json();
  dispatch(receivePost(post));
  return response;
};

export const fetchAllPosts = () => async dispatch => {
  const response = await csrfFetch("/api/posts");
  const posts = await response.json();
  dispatch(receivePosts(posts));
  // return response;
};



const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {...state};
  switch (action.type) {
  case RECEIVE_POST:
    newState[action.post.id] = action.post;
    return newState;
  case RECEIVE_POSTS:
    return {...newState, ...action.posts};
  case REMOVE_POST:
    delete newState[action.postId];
    return newState;
  default:
    return state;
  }
};

export default postsReducer;