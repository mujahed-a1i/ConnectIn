import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './reducers/session';
import postsReducer from './reducers/posts';
import modalsReducer from './reducers/modals';
import usersReducer from './reducers/users';
import experiencesReducer from './reducers/experiences';

const rootReducer = combineReducers({
  users: usersReducer,
  session: sessionReducer,
  posts: postsReducer,
  modals: modalsReducer,
  experiences: experiencesReducer
  
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;


  
