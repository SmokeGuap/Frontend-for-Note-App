import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/Layout';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Pages = () => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path='/mynotes'
          element={
            data.isLoggedIn === true ? <MyNotes /> : <Navigate to='/signin' />
          }
        />
        <Route
          path='/favorites'
          element={
            data.isLoggedIn === true ? <Favorites /> : <Navigate to='/signin' />
          }
        />
        <Route
          path='/new'
          element={
            data.isLoggedIn === true ? <NewNote /> : <Navigate to='/signin' />
          }
        />
        <Route
          path='/edit/:id'
          element={
            data.isLoggedIn === true ? <EditNote /> : <Navigate to='/signin' />
          }
        />
        <Route path='/note/:id' element={<NotePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Route>
    </Routes>
  );
};
export default Pages;
