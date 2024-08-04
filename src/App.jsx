import { useState } from 'react';
import { Routes,Route,BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import Signup from './components/Signup';
import AddBook from './components/AddBook';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/addBook" element={<AddBook/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
