import React from 'react';
import Header from '../components/common/Header'
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer'
import PaginationContainer from '../containers/posts/PaginationContainer'

const PostListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </div>
  );
};

export default PostListPage;