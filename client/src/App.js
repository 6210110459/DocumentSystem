import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Homee from './components/admin/Homee';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import Status from './components/Status';
import Detail from './components/Detail';
import Edit from './components/admin/Edit';
import Login from './components/Login';

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
        <Route path='/edit/:id' element={<Edit/>} />
        {/* admin page */}
        <Route path='/admin/home' element={<Homee/>} />
        
      </Routes>
      
    </>
  );
}

export default App;
