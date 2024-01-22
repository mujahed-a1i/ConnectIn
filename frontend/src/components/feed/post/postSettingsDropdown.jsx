import {useDispatch, useSelector} from 'react-redux';
import "./postSettingsDropDown.css";
import trashCan from "../../assests/icons/delete-trashcan.png";
import pencil from "../../assests/icons/edit-pencil.png";
import * as postsActions from "../../../store/reducers/posts";
import * as modalActions from "../../../store/reducers/modals";
import EditModal from  "../modals/editModal";



export default function PostSettingsDropDown({post, visible, setVisible}) { 
  console.log(setVisible)
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const type = useSelector(state => state.modals.editModal);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(postsActions.deletePost(post.id));
    setVisible(!visible);
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    console.log('clicked')
    dispatch(modalActions.showModal("editModal"));

  }; 

  // console.log(currentUser.id === post.userId)
  if (currentUser.id === post.userId) {
    return (
      <>
        <div className='editModalWrapper'>
          {type && <EditModal post={post} visible={visible} setVisible={setVisible}/> }
        </div>
        <div className='editPostWrapper'>
          <img src={pencil} alt="edit" height="30" width="30"/>
          <button onClick={handleShowModal}>Edit Post</button>
        </div>
        
        <div className='deletePostWrapper'>
          <img src={trashCan} alt="delete" height="30" width="30"/>
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      </>
    
    );
    
  }


  
}