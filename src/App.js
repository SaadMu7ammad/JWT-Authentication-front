import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Reset from './Reset/Reset';
import NewPass from './NewPass/NewPass';
import Home from './Home/Home';
import All from './All/All';
import store from './Redux/Store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
