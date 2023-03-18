import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
// import React, { useState, useEffect } from 'react';

import Status from './components/student/Status';
import Detail from './components/student/Detail';
import Header from './components/Header';
import Home from './components/student/Home';
import Register from './components/student/Register';

import Login from './components/Login';
import Registeruser from './components/Registeruser';

import Edit from './components/admin/Edit';
import Homee from './components/admin/Homee';
import Detaill from './components/admin/Detaill';

import HomeT from './components/teacher/HomeT';

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

          {/* admin page */}
          <Route path='/admin/home' element={<Homee />} />
          <Route path='/detaill/:id' element={<Detaill />} />
          <Route path='/update/:id' element={<Edit />} />

          <Route path='/teacher/home' element={<HomeT />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
