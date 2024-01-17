import "./feedPage.css"
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { useState, useEffect } from "react";
import NavigationBar from "../navigationBar/navigationBar";

export default function FeedPage () {
  let currentUser = sessionStorage.currentUser;

  if (currentUser === 'null') return <Navigate to="/" replace={true} />
  
  return (
    <div className="feedPage">
      <NavigationBar/>
      <h1>Logged In</h1>
    </div>
  )


}