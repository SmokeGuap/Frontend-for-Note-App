import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = (props) => {
  const navigate = useNavigate();

  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp);
      // client.writeData({ data: { isLoggedIn: true } });
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true },
      });
      navigate('/');
    },
  });

  useEffect(() => {
    document.title = 'Sign Up — Notedly';
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
