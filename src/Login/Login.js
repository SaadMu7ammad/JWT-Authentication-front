import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useState } from 'react';
import { fetchDataUser } from '../Redux/Slices/UpdateSlice';
function Login() {
  const dispatch=useDispatch()
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('none');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function checkLogin(e) {
    e.preventDefault();
    axios
      .post('http://localhost:8080/login', {
        email,
        password,
      })
      .then((result) => {
        if (result.data.status === true) {
          localStorage.setItem('accessToken', result.data.result.accessToken);
          navigate('/home'); // Pass accessToken as state
          dispatch(fetchDataUser())

        } else {
          setErr('block');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="container">
      <div className="card">
        <h2 style={{ display: err ,color:'red'}}>invalid</h2>

        <h2>Login Form</h2>
        <form method="Post">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            placeholder="Enter your Email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            placeholder="Enter your password"
          />

          <button type="submit" onClick={checkLogin}>
            Login
          </button>
        </form>
        <div className="switch">
          Don't have an account? <Link to="/Register">Register here</Link>
        </div>
        <div className="switch">
          Forgot password?<Link to="/Reset">Reset here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
