import { handleActions } from 'redux-actions';
import * as api from '../libs/api';
import createRequestThunk from '../libs/createRequestThunk'

const GET_POST = 'sample/GET_POST'; // 요청 시작
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS'; // 요청 성공
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE'; // 요청 실패

const GET_USERS = 'sample/GET_USERS'
const GET_USERS_SUCCESS = 'sample/GET_USER_SUCCESS'
const GET_USERS_FAILURE = 'sample/GET_USER_FAILURE'

// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST })

//   try {
//     const response = await api.getPost(id)
//     dispatch({
//       type: GET_POST_SUCCESS,
//       payload: response.data
//     })
//   } catch (error) {
//     dispatch({
//       type: GET_POST_FAILURE,
//       payload: error,
//       error: true
//     });

//     throw error;
//   }
// };

export const getPost = createRequestThunk(GET_POST, api.getPost)

export const getUsers = () => async dispatch => {
  dispatch({ type: GET_USERS });

  try {
    const response = await api.getUsers();
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data
    })
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true
    })

    throw e;
  }
}

const initialState = {
  loadding: {
    GET_POST: false,
    GET_USERS: false
  },
  post: null,
  users: null
}

const sample = handleActions({
  [GET_POST]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: true
    }
  }),
  [GET_POST_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: false
    },
    post: action.payload
  }),
  [GET_POST_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: false
    }
  }),
  [GET_USERS]: state => ({
    ...state,
    laoding: {
      ...state.loading,
      GET_USERS: true
    }
  }),
  [GET_USERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: false
    },
    users: action.payload
  }),
  [GET_USERS_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: false
    }
  })
}, initialState)

export default sample;