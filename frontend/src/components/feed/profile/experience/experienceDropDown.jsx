import {useDispatch, useSelector} from 'react-redux';
import "./experienceDropDown.css";
import trashCan from "../../../assests/icons/delete-trashcan.png";
import pencil from "../../../assests/icons/edit-pencil.png";
import * as experienceActions from "../../../../store/reducers/experiences";
import * as modalActions from "../../../../store/reducers/modals";
// import { fetchOnePost } from "../../../store/reducers/posts";
// import EditModal from  "../modals/editModal";


export default function ExperienceDropDown({experience, visible, setVisible}) { 


  const currentUser = useSelector(state => state.session.user);

  // const type = useSelector(state => state.modals.editModal);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(experienceActions.deleteExperience(experience.id));
    setVisible(!visible);
  };

  // const handleShowModal = (e) => {
  //   e.preventDefault();
  //   setVisible(!visible);
  //   // dispatch(fetchOnePost(post.id));
  //   dispatch(modalActions.showModal(experience.id));
  // }; 


  const handleShowEditExperienceModal = (e) => {
    e.preventDefault();
    // dispatch(modalActions.showModal("editExperience"));
    dispatch(modalActions.showModal(experience.id));
    // console.log(experience)
    setVisible(!visible);
  }; 



  if (currentUser.id === experience.userId) {
    return (
      <>
        {/* <ExperienceModal className="editExpModalWrapper" experience={experience}/> */}

        {/* <div className='editModalWrapper'>
          {(type && (currentUser.id === post.userId) ) && <EditModal post={post} visible={visible} setVisible={setVisible}/> }
        </div> */}
        <div className='editExperienceWrapper' onClick={handleShowEditExperienceModal}>
          <img src={pencil} alt="edit" height="30" width="30"/>
          <button >Edit</button>
        </div>
        <hr />
        <div className='deleteExperienceWrapper' onClick={handleDelete}>
          <img src={trashCan} alt="delete" height="30" width="30"/>
          <button >Delete</button>
        </div>
      </>
    
    );
    
  }


  
}