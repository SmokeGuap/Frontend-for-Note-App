import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/mynotes' element={<MyNotes />} />
        <Route path='/favorites' element={<Favorites />} />
      </Route>
    </Routes>
  );
};
export default Pages;
