import { handleActions } from 'redux-actions';
import * as postsAPI from '../api/posts';

/* 액션 타입 */
// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = () => async dispatch => {
  dispatch({ type: GET_POSTS })

  try {
    const posts = await postsAPI.getPosts();
    dispatch({ type: GET_POSTS_SUCCESS, posts })
  } catch (error) {
    dispatch({ type: GET_POSTS_ERROR, error })
  }
}

export const getPost = id => async dispatch => {
  dispatch({ type: GET_POST })

  try {
    const post = await postsAPI.getPost(id);
    dispatch({ type: GET_POST_SUCCESS, post })
  } catch (error) {
    dispatch({ type: GET_POST_ERROR, error })
  }
}

const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null
  },
  post: {
    loading: false,
    data: null,
    error: null
  }
}

const posts = handleActions({
  [GET_POSTS]: state =>({
    ...state,
    posts: {
      ...state.posts,
      loading: true
    }
  }),
  [GET_POSTS_SUCCESS]: (state, action) =>({
    ...state,
    posts: {
      ...state.posts,
      loading: false,
      data: action.posts
    }
  }),
  [GET_POSTS_ERROR]: (state, action) =>({
    ...state,
    posts: {
      ...state.posts,
      loading: false,
      error: action.error
    }
  }),
  [GET_POST]: state =>({
    ...state,
    post: {
      ...state.post,
      loading: true
    }
  }),
  [GET_POST_SUCCESS]: (state, action) =>({
    ...state,
    post: {
      ...state.post,
      loading: false,
      data: action.post
    }
  }),
  [GET_POST_ERROR]: (state, action) =>({
    ...state,
    post: {
      ...state.post,
      loading: false,
      error: action.error
    }
  }),
}, initialState)

export default posts