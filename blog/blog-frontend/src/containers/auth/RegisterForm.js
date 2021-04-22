import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({auth}) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({
      form: 'register',
      key: name,
      value
    }))
  }
  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    console.log('onRegister')
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if(password !== passwordConfirm) {
      // TODO: error
      return;
    }
    dispatch(register({ username, password }));
  }

  useEffect(() => {
    dispatch(initializeForm('register'))
  }, [dispatch])

  useEffect(() => {
    console.log('do error')
    console.log(auth, authError)
    if(authError) {
      console.log('Error!!')
      console.log(authError)
    }
    if(auth) {
      console.log('Regisiter Success');
      console.log(auth)
    }
  }, [auth, authError])

  useEffect(() => {
    dispatch(initializeForm('register'))
  }, [dispatch])

  return (
    <AuthForm 
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;