import React, { useReducer } from 'react';

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: ''
  });
  
  let { name, nickname } = state;

  const onChange = e => {
    console.log(e.target, e.target.name, e.target.value)
    dispatch(e.target)
  }

  return (
    <div>
      <input type="text" name="name" value={name} onChange={onChange}/>
      <input type="text" name="nickname" value={nickname} onChange={onChange}/>
      <div>name: {name}</div>
      <div>nickname: {nickname}</div>
    </div>
  );
};

export default Info;