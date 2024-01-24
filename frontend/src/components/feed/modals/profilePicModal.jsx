import "./profilePicModal.css";
import profilePicModalPicture from "../../assests/profillePicModal/profilePicModal.png";
import * as modalActions from "../../../store/reducers/modals";
import { useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import * as userActions from "../../../store/reducers/users"

export default function ProfilePicModal() {
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
      formData.append('user[profile_pic]', photoFile);
    }
    for (const pair of formData.keys()) {
      console.log(pair); // This will log the key
    }

    if (dispatch(userActions.updateUser(formData))) {
      dispatch(modalActions.hideModal("profilePicModal"))
    }

  };


  const handleCloseModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal("profilePicModal"));
  };
  return (
    <div className="profilePicModalContainer">
      <div className="profilePicModalTitleWrapper">
        <h1 className="profilePicModalTitle">Add Photo</h1>
        <button onClick={handleCloseModal}>close</button>
      </div>
      <hr/>
      <h2 className="headshotSlogan">No professional headshot needed <br />
          Just something that represents you.
      </h2>
      
      <img className="profilePicModalPicture" src={profilePicModalPicture} alt="" height="104" width="438"/>
      <h2 className="identitySlogan">On ConnectIn, we require members to use their real identities, 
        so take or upload a photo of yourself. 
      </h2>
      <hr />
      <div className="profilePicModalButtons">
        <input type="file" onChange={handleFile} />
        <button onClick={handleUpload}>Upload Photo</button>
      </div>
    </div>
  )
}