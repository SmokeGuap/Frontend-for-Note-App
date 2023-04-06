import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mynotes' element={<MyNotes />} />
      <Route path='/favorites' element={<Favorites />} />
    </Routes>
  );
};
export default Pages;
