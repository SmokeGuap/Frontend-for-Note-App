import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
const SignIn = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign In — Notedly';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn);
      // client.writeData({ data: { isLoggedIn: true } });
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
