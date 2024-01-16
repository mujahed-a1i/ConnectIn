import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
import {restoreSession } from './store/csrf';
import * as sessionActions from './store/reducers/session';



const initializeApp = () => {
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  let initialState = {};

  if (currentUser) {
    initialState = {
      session: {
        [currentUser.id]: currentUser
      }
    }
  }
  const store = configureStore();
  

  if (import.meta.env.MODE !== 'production') {
    window.store = store;
    window.sessionActions = sessionActions;

  }


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

restoreSession().then(initializeApp)