import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
import {restoreCSRF } from './store/csrf';
import * as sessionActions from './store/reducers/session';
import * as postActions from './store/reducers/posts';
import * as usersActions from "./store/reducers/users"
// import { restoreSession  } from './store/reducers/session';

const store = configureStore();


if (import.meta.env.MODE !== 'production') {
  await restoreCSRF();
  window.store = store;
  window.sessionActions = sessionActions;
  window.postActions = postActions;
  window.usersActions = usersActions;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



