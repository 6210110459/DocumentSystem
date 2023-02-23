import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom";

import Status from './components/student/Status';
import Detail from './components/student/Detail';
import Header from './components/student/Header';
import Home from './components/student/Home';
import Register from './components/student/Register';

import Login from './components/Login';

import Edit from './components/admin/Edit';
import Homee from './components/admin/Homee';
import Detaill from './components/admin/Detaill';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* student page */}
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/status' element={<Status/>} />
        <Route path='/detail/:id' element={<Detail/>}/>
        
        {/* admin page */}
        <Route path='/admin/home' element={<Homee/>} />
        <Route path='/detaill/:id' element={<Detaill/>} />
        <Route path='/update/:id' element={<Edit/>} />

      </Routes>
      
    </>
  );
}

export default App;
