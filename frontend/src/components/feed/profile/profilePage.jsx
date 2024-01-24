import "./profilePage.css"
import {useParams} from 'react-router-dom'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import * as usersAction from '../../../store/reducers/users'
import NavigationBar from '../../navigationBar/navigationBar';
import ProfileBanner from './banner/profileBanner';
import ProfilePicModal from "../modals/profilePicModal";
export default function ProfilePage() {
  
  const {userId} = useParams();
  const user = useSelector(state => state.users[userId])
  const type = useSelector(state => state.modals.profilePicModal)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersAction.fetchUser(userId));
  },[dispatch, userId]);
  

  
  // console.log(user.firstName);

  if (!user) {
    return (
      <h1>Loading</h1>
    )
  }
  if (user) {
    return (
      <div className="profilePageWrapper">
        <div className="feedNavigationWrapper">
          <NavigationBar />
        </div>
   
        <div className="profilePageContentWrapper">
          <div className='profileBannerWrapper'>
            { type && 
              <div className="profilePicModalWrapper">
                < ProfilePicModal />
              </div>
            }
            <ProfileBanner user={user} />
          </div>

        </div>
  
 
       
      </div>

    );

  }
  
}