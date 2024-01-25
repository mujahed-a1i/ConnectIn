import {useDispatch, useSelector} from 'react-redux';
import "./postSettingsDropDown.css";
import trashCan from "../../assests/icons/delete-trashcan.png";
import pencil from "../../assests/icons/edit-pencil.png";
import * as postsActions from "../../../store/reducers/posts";
import * as modalActions from "../../../store/reducers/modals";
// import { fetchOnePost } from "../../../store/reducers/posts";
// import EditModal from  "../modals/editModal";

export default function PostSettingsDropDown({post, visible, setVisible}) { 


  const currentUser = useSelector(state => state.session.user);

  // const type = useSelector(state => state.modals.editModal);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(postsActions.deletePost(post.id));
    setVisible(!visible);
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    setVisible(!visible);
    // dispatch(fetchOnePost(post.id));
    dispatch(modalActions.showModal(post.id));
    
  }; 




  if (currentUser.id === post.userId) {
    return (
      <>
        {/* <div className='editModalWrapper'>
          {(type && (currentUser.id === post.userId) ) && <EditModal post={post} visible={visible} setVisible={setVisible}/> }
        </div> */}
        <div className='editPostWrapper' onClick={handleShowModal}>
          <img src={pencil} alt="edit" height="30" width="30"/>
          <button >Edit Post</button>
        </div>
        
        <div className='deletePostWrapper' onClick={handleDelete}>
          <img src={trashCan} alt="delete" height="30" width="30"/>
          <button >Delete Post</button>
        </div>
      </>
    
    );
    
  }


  
}