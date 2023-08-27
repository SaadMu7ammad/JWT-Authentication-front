import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Reset from './Reset/Reset';
import NewPass from './NewPass/NewPass';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import All from './All/All';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/NewPass/:ID" element={<NewPass />} />
        <Route path="/home/all" element={<All />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
