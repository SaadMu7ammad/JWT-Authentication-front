import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [err, setErr] = useState('none');
  const [msg, setMsg] = useState('err');

  const navigate = useNavigate();
  function checkRegister(e) {
    e.preventDefault();
    if (email && password && fullName) {
      axios
        .post('https://taskat-xme4.onrender.com/register', {
          email,
          password,
          fullName,
        })
        .then((result) => {
          if (result.data === true) {
            navigate('/login');
          } else {
            // navigate('/Register');

            setErr('block');
            setMsg('email is used');
          }

          //   res.json(res)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="container">
      <div className="card">
        <h2 style={{ display: err, color: 'red' }}>{msg}</h2>

        <h2>Register Form</h2>
        <form method="post">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            name="fullname"
            placeholder="Enter your full name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
          />

          <label htmlFor="new-password">New Password</label>
          <input
            type="text"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your new password"
          />

          <button type="submit" onClick={checkRegister}>
            Register
          </button>
        </form>
        <div className="switch">
          Already have an account?
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
