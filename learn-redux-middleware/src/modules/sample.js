import { handleActions } from 'redux-actions';

import * as api from '../lib/api';

const GET_POST = 'sample/GET_POST'; // 요청 시작
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS'; // 요청 성공
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE'; // 요청 실패

const GET_USERS = 'sample/GET_USERS'
const GET_USERS_SUCCESS = 'sample/GET_USER_SUCCESS'
const GET_USERS_FAILURE = 'sample/GET_USER_FAILURE'

export const getPost = id => async dispatch => {
  dispatch({ type: GET_POST })

  try {
    const resonse = await api.getPost(id)
    dispatch({
      type: GET_POST_SUCCESS,
      payload: resonse.data
    })
  } catch (error) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: error,
      error: true
    });

    throw error;
  }
};

export const getUsers = () => async dispatch => {
  dispatch({ type: GET_USERS });

  try {
    const response = await api.getUSers();
    dispatch({
      type: GET_USERS_SUCCESS,
      paylaod: response.data
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