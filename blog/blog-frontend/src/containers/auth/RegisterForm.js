import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { changeField, initializeForm, register } from '../../modules/auth';
import { check } from '../../modules/user'
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
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
    if(authError) {
      console.log('Error!!')
      console.log(authError)
    }
    if(auth) {
      console.log('Regisiter Success');
      console.log(auth)
      dispatch(check())
    }
  }, [auth, authError, dispatch])

  useEffect(() => {
    console.log('check user')
    if(user) {
      history.push('/')
    }
  }, [history, user])

  return (
    <AuthForm 
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(RegisterForm);