import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';

import UserForm from '../components/UserForm';
import { IS_LOGGED_IN } from '../gql/query';
import { SIGNUP_USER } from '../gql/mutation';

const SignUp = () => {
  const navigate = useNavigate();

  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp);
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true },
      });
      navigate('/');
    },
  });

  return (
    <>
      <UserForm action={signUp} formType='signup' />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </>
  );
};
export default SignUp;
