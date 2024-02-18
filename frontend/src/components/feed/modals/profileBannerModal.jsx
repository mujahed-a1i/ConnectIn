import "./profileBannerModal.css";
import * as modalActions from "../../../store/reducers/modals";
import { useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import * as userActions from "../../../store/reducers/users"

export default function ProfileBannerModal() {
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  const [photoFile, setPhotoFile] = useState (null)
  
  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setPhotoFile(file);
  };

  const handleUpload = e => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('id', currentUser.id)
    if (photoFile) {
      formData.append('user[profileBanner]', photoFile);
    }
    // for (const pair of formData.keys()) {
    //   console.log(pair); // This will log the key
    // }

    if (dispatch(userActions.updateUser(formData))) {
      dispatch(modalActions.hideModal("profileBannerPicModal"))
    }

  };


  const handleCloseModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal("profileBannerPicModal"));
  };
  return (
    <div className="profileBannerPicModalContainer">
      <div className="profileBannerPicModalTitleWrapper">
        <h1 className="profileBannerPicModalTitle">Add a Background</h1>
        <button className="profileBannerPicCloseModalButton" onClick={handleCloseModal}>close</button>
      </div>
      <hr className="profileBannerPicModalHR"/>
      <h2 className="headshotSlogan">Upload a photo <br/>
Showcase your personality, interests, work, or team moments
      </h2>
      
      {/* <img className="profilePicModalPicture" src={profilePicModalPicture} alt="" height="104" width="438"/> */}
      <h2 className="identitySlogan">Choose an image that captures your interests or personality

 
      </h2>
      <hr className="profilBannerPicModalHR"/>
      <div className="profileBannerPicModalButtons">
        <input className="profileBannerPicFileSelect" type="file" onChange={handleFile} />
        <button className="profileBannerPicUploadButton" onClick={handleUpload}>Upload Photo</button>
      </div>
    </div>
  )
}