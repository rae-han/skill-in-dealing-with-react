export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return param => async dispatch => {
    dispatch({type, param});

    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload })
    } catch(error) {
      dispatch({ type: ERROR, paylaod: error, error: true })
    }
  };
};
