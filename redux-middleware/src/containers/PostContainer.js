import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, clearPost } from '../modules/posts'
import Post from '../components/Post'

const PostContainer = ({postId}) => {
  const { data, loading, error } = useSelector(state => state.posts.post)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(postId)
    dispatch(getPost(postId));

    return () => {
      console.log('clean')
      dispatch(clearPost())
    }
  }, [dispatch, postId])

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Post post={data} />;
};

export default PostContainer;