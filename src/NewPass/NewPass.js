import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Import useParams

function NewPass() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { ID } = useParams(); // Use useParams hook to extract the dynamic ID
  console.log(ID);
  async function changePass(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:8080/reset/${ID}`, {
        password,
      })
      .then((result) => {
        console.log(result.data);
        console.log('after login in front');
        // console.log(location);
        if (result.data === true) {
          navigate('/home');
        } else {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="container">
      <div className="card">
        <h2>change password Form</h2>
        <form method="post">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" onClick={changePass}>
            change
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPass;
