import "./postIndex.css";
import { useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import { fetchAllPosts } from "../../../store/reducers/posts";
import PostIndexItem from "./postIndexItem";
import {useParams } from 'react-router-dom';







export default function PostIndex() {
  // const [visible, setVisible] = useState(false);
  // const type = useSelector(state => state.modals.editModal);
  const params = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
 
  useEffect(() => {
    dispatch(fetchAllPosts());
  },[dispatch]);

  if (params.feed === 'feed') {
    return (
      <div className="feedPostIndexWrapper">
        {Object.values(posts).reverse().map((post) => (
          
          
          <div key={post.id}>
            
            
            <PostIndexItem post={post} />
          </div>
        ))}
      </div>
    );

  }
  

}