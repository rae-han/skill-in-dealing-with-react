// import { handleActions } from 'redux-actions';
import * as postsAPI from '../api/posts';
import { createPromiseThunk, reducerUtils, handleAsyncActions } from '../libs/utils/asyncUtils'

/* 액션 타입 */
// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const CLEAR_POST = 'CLEAR_POST'

// export const getPosts = () => async dispatch => {
//   dispatch({ type: GET_POSTS })

//   try {
//     const posts = await postsAPI.getPosts();
//     dispatch({ type: GET_POSTS_SUCCESS, posts })
//   } catch (error) {
//     dispatch({ type: GET_POSTS_ERROR, error })
//   }
// }

// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST })

//   try {
//     const post = await postsAPI.getPost(id);
//     dispatch({ type: GET_POST_SUCCESS, post })
//   } catch (error) {
//     dispatch({ type: GET_POST_ERROR, error })
//   }
// }
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPost)

export const clearPost = () => ({ type: CLEAR_POST })

const initialState = {
  // posts: {
  //   loading: false,
  //   data: null,
  //   error: null
  // },
  // post: {
  //   loading: false,
  //   data: null,
  //   error: null
  // }
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
}

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts')(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, 'post')(state, action)
    default:
      return state;
  }
}

// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         posts: reducerUtils.loading()
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         posts: reducerUtils.success(action.payload) // action.posts -> action.payload 로 변경됐습니다.
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         posts: reducerUtils.error(action.error)
//       };
//     case GET_POST:
//       return {
//         ...state,
//         post: reducerUtils.loading()
//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: reducerUtils.success(action.payload) // action.post -> action.payload 로 변경됐습니다.
//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         post: reducerUtils.error(action.error)
//       };
//     default:
//       return state;
//   }
// }

// const posts = handleActions({
//   [GET_POSTS]: state =>({
//     ...state,
//     posts: {
//       ...state.posts,
//       loading: true
//     }
//   }),
//   [GET_POSTS_SUCCESS]: (state, action) =>({
//     ...state,
//     posts: {
//       ...state.posts,
//       loading: false,
//       data: action.posts
//     }
//   }),
//   [GET_POSTS_ERROR]: (state, action) =>({
//     ...state,
//     posts: {
//       ...state.posts,
//       loading: false,
//       error: action.error
//     }
//   }),
//   [GET_POST]: state =>({
//     ...state,
//     post: {
//       ...state.post,
//       loading: true
//     }
//   }),
//   [GET_POST_SUCCESS]: (state, action) =>({
//     ...state,
//     post: {
//       ...state.post,
//       loading: false,
//       data: action.post
//     }
//   }),
//   [GET_POST_ERROR]: (state, action) =>({
//     ...state,
//     post: {
//       ...state.post,
//       loading: false,
//       error: action.error
//     }
//   }),
//   [CLEAR_POST]: state => ({
//     ...state,
//     post: {
//       ...state.post,
//       data: null
//     }
//   })
// }, initialState)
// 
// export default posts