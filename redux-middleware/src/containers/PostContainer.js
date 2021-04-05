import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPost } from '../modules/posts'
import Post from '../components/Post'

const PostContainer = ({postId}) => {
  const { data, loading, error } = useSelctor(state => state.posts.post)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId])

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Post post={data} />;
};

export default PostContainer;