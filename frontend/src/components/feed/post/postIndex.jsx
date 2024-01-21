import "./postIndex.css";
import { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { fetchAllPosts } from "../../../store/reducers/posts";
import PostIndexItem from "./postIndexItem";
import {useParams } from 'react-router-dom';






export default function PostIndex() {
  const params = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  // console.log(posts)

  // console.log(arrayPost.reverse())
  // console.log(posts)
  // console.log(Object.values(posts).sort((a,b) => b.id - a.id));
  // console.log(Object.values(posts).sort((a, b) => b[Object.keys(b)[0]].id - a[Object.keys(a)[0]].id));

  useEffect(() => {
    dispatch(fetchAllPosts());
  },[dispatch]);
  // console.log(posts);
  if (params.feed === 'feed') {
    return (
      <div>
        {Object.values(posts).map((post) => (
          <div className="feedPostIndexWrapper" key={post.id}>
            <PostIndexItem post={post}/>
          </div>
        ))}
      </div>
    );

  }
  

}