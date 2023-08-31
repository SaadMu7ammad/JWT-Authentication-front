import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Reset() {
  const [email, setEmail] = useState('');
  const navigate=useNavigate()
  function sendEmailReset(e) {
    e.preventDefault();
    axios
      .post('http://localhost:8080/reset',{email})
      .then((result) => {
        navigate('/login')
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container">
      <div className="card">
        <h2>Reset Form</h2>
        <form method="post">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your Email"
          />
          <button type="submit" onClick={sendEmailReset}>
            reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reset;
