import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/mynotes' element={<MyNotes />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/note/:id' element={<NotePage />} />
      </Route>
    </Routes>
  );
};
export default Pages;
