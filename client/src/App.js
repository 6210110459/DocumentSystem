import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Homee from './components/admin/Homee';
import View from './components/admin/View';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import Status from './components/Status';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* student page */}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/status' element={<Status/>} />
        <Route path='/view' element={<View/>} />
        {/* admin page */}
        <Route path='/admin/home' element={<Homee/>} />
        
      </Routes>
      
    </>
  );
}

export default App;
