import React, { useState } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeName = e => {
    setName(e.target.value)
  }

  const onChangeNickname = e => {
    setNickname(e.target.value)
  }

  return (
    <div>
      <input type="text" value={name} onChange={onChangeName}/>
      <input type="text" value={nickname} onChange={onChangeNickname}/>
      <div>name: {name}</div>
      <div>nickname: {nickname}</div>
    </div>
  );
};

export default Info;