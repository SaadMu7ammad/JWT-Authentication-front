import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { useState } from 'react';
function Login() {
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
        // console.log(result.data.accessToken);
        console.log(result.data.result);
        console.log(result.data.result.accessToken);
        // console.log('after login in front');
        // console.log(location);
        if (result.data.status === true) {
          // navigate('/home');
          localStorage.setItem('accessToken', result.data.result.accessToken);

          navigate('/home'); // Pass accessToken as state

        } else {
          // navigate('/login');
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
          Forgot password? <a href="/reset">Reset here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
