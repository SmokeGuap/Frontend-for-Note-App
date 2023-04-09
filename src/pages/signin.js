import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';

import UserForm from '../components/UserForm';
import { IS_LOGGED_IN } from '../gql/query';
import { SIGNIN_USER } from '../gql/mutation';

const SignIn = () => {
  const navigate = useNavigate();

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn);
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true },
      });
      navigate('/');
    },
  });

  return (
    <>
      <UserForm action={signIn} formType='signIn' />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </>
  );
};
export default SignIn;
