import csrfFetch from "../csrf";

// Action Types
const RECEIVE_POST = "user/receivePost";
const RECEIVE_POSTS = "user/receivePosts";
const REMOVE_POST = "user/removePost";
const FETCH_POST = "user/fetchPost";

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

const removePost = (postId) => {
  return {
    type: REMOVE_POST,
    postId,
  };
};

const fetchPost = (post) => {
  return {
    type: RECEIVE_POST,
    post,
  };
};

// Thunk Action Creator 
export const createPost = (newPost) => async dispatch => {
  
  const response = await csrfFetch("/api/posts", {
    method: "POST",
    body: newPost,
    // body: JSON.stringify(newPost),
  });
  
  const {post} = await response.json();
  dispatch(receivePost(post));
  return response;
};

export const updatePost = (updatedPost) => async dispatch => {
  const response = await csrfFetch(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedPost),
  });

  const { post } = await response.json(); // <-- This is causing the issue
  dispatch(receivePost(post));
  return response;
};


export const fetchAllPosts = () => async dispatch => {
  const response = await csrfFetch("/api/posts");
  const posts = await response.json();
  dispatch(receivePosts(posts));
  // return response;
};

export const fetchOnePost = (postId) => async dispatch => {
  const response = await csrfFetch(`/api/posts/${postId}`);
  const post = await response.json();
  dispatch(fetchPost(post));
  // return response;
};

export const deletePost = (postId) => async dispatch => {
  const response = await csrfFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  
  dispatch(removePost(postId));
  return response;
};



const postsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {...state};
  switch (action.type) {
  case RECEIVE_POST:
    newState[action.post.id] = action.post;
    return newState;
  case RECEIVE_POSTS:
    return {...newState, ...action.posts};
  case REMOVE_POST:
    delete newState[action.postId];
    return newState;
  case FETCH_POST:
    newState = {  ...newState, post: action.post};
    return newState;
  default:
    return state;
  }
};

export default postsReducer;