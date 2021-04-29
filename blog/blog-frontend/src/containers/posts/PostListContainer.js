import React, { useEffect } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts'

const PostListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    user: user.user
  }))

  useEffect(() => {
    // const { username } = match.parse;
    // const { tag, page } = qs.parse(location.search, {
    //   ignoreQueryPrefix: true
    // });
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    console.log(tag, username, page)
    dispatch(listPosts({ tag, username, page }))
  }, [dispatch, location.search])

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default withRouter(PostListContainer);