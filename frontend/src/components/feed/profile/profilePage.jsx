import "./profilePage.css"
import {useParams} from 'react-router-dom'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import * as usersAction from '../../../store/reducers/users'
import NavigationBar from '../../navigationBar/navigationBar';
import ProfileBanner from './banner/profileBanner';
import ProfilePicModal from "../modals/profilePicModal";
import ProfileBannerModal from "../modals/profileBannerModal";
export default function ProfilePage() {
  
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.session.user);

  const {userId} = useParams();
  const user = useSelector(state => state.users[userId])
  const type = useSelector(state => state.modals.profilePicModal)
  const type2 = useSelector(state => state.modals.profileBannerPicModal)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersAction.fetchUser(userId));
  },[dispatch, userId]);
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  
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
            { type2 && 
              <div className="profileBannerPicModalWrapper">
                < ProfileBannerModal />
              </div>
            }
            <ProfileBanner user={user} />
            
       

          
          </div>
          <div className="profileLinkInfoWrapper">
            <div className="profileLinkContainer">
              <h2>Public profile & URL</h2>
              <p>{`${window.location.href}`} </p>
            </div>
            
          </div>

        </div>
  
 
       
      </div>

    );

  }
  
}