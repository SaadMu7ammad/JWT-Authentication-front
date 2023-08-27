import React, { useState } from 'react';
import './Card.css';
import axios from 'axios';

function Card({ data }) {
  // console.log(data)
  const [temp, settemp] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);
  const headers = {
    // Define your headers here
    Authorization: `Bearer ${accessToken}`,
    // Add other headers if needed
  };
  // function delMe(e) {

  // }
  async function deleteTask(e) {
    console.log(
      e.target.closest('div.card').querySelector('input[type="hidden"]').value
    );
    const taskName = e.target
      .closest('.card')
      .querySelector('h3.card-title').textContent;
    // const taskVal=prompt()
    console.log(taskName);
    try {
      const result = await axios.post(
        `http://localhost:8080/delete`,
        { name: taskName },
        { headers }
      );
      console.log(result.data);
      const newTasks = result.data;
      showTasks();
      // window.location.reload();
      console.log(newTasks);
    } catch (err) {
      console.log(err);
    }
  }

  async function showTasks() {
    try {
      const result = await axios.get('http://localhost:8080/home', { headers });
      const newTasks = result.data;
      settemp(newTasks);
      console.log(newTasks);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="card">
      <h3 className="card-title">{data[0]}</h3>
      <p>added by {data[1]}</p>
      <div className="card-buttons">
        <button className="edit-button">Edit</button>
        <button className="delete-button" onClick={deleteTask}>
          Delete
        </button>
        <input type="hidden" value={data[2]}></input>
      </div>
    </div>
  );
}

export default Card;
