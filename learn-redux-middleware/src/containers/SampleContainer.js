import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample'

const { useEffect } = React;

const SampleContainer = () => {
  const post = useSelector(state => state.sample.post);
  const users = useSelector(state => state.sample.users)  
  const { GET_POST: loadingPost, GET_USERS: loadingUsers } = useSelector(state => state.sample.loadding);

  const dispatch = useDispatch();
  const fetchPost = () => (dispatch(getPost()));
  const fetchUsers = () => (dispatch(getUsers()));


  useEffect(() => {
    fetchPost(1);
    fetchUsers(1);
  })

  return (
    <div>
      <Sample 
        post={post}
        users={users}
        loadingPost={loadingPost}
        loadingUsers={loadingUsers}
      />
    </div>
  );
};

export default SampleContainer;