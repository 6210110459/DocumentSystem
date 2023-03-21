import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
// import React, { useState, useEffect } from 'react';

import Status from './components/student/Status';
import Detail from './components/student/Detail';
import Header from './components/Header';
import Home from './components/student/Home';
import Register from './components/student/Register';
import Editt from './components/student/Editt';

import Login from './components/Login';
import Registeruser from './components/Registeruser';

import Edit from './components/admin/Edit';
import Homee from './components/admin/Homee';
import Detaill from './components/admin/Detaill';
import Fail from './components/admin/Fail';

import HomeT from './components/teacher/HomeT';
import DetailT from './components/teacher/DetailT';

function App() {
  // const token = localStorage.getItem('token')

  // if (!token) {
  //   return <Login />
  // }

  return (
    <>
      <div className='wrapper'>
        <Header />
        <Routes>
          {/* student page */}
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Registeruser />} />
          <Route path='/home' element={<Home />} />
          <Route path='/upload' element={<Register />} />
          <Route path='/status' element={<Status />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/edit/:id' element={<Editt />} />

          {/* admin page */}
          <Route path='/admin/home' element={<Homee />} />
          <Route path='/detaill/:id' element={<Detaill />} />
          <Route path='/update/:id' element={<Edit />} />
          <Route path='/fail/:id' element={<Fail/>} />

          <Route path='/teacher/home' element={<HomeT />} />
          <Route path='/teacher/detial/:id' element={<DetailT />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
