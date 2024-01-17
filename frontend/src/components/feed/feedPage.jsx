import "./feedPage.css"
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import NavigationBar from "../navigationBar/navigationBar";


export default function FeedPage () {
  let currentUser = useSelector((state) => state.session.user);

  if (!currentUser) return <Navigate to="/" replace={true} />;
  
  return (
    <div className="feedPage">
      <NavigationBar/>
    </div>
  )


}