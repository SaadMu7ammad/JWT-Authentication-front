import React, { useState } from 'react';
import './Card.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Card({ data }) {
  // console.log(data)
  // const history = useHistory();

  const navigate = useNavigate();
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
    // console.log(
    //   e.target.closest('div.card').querySelector('input[type="hidden"]').value
    // );
    const userId = e.target
      .closest('div.card')
      .querySelector('input[type="hidden"]').value;
    console.log(userId);
    const taskName = e.target
      .closest('.card')
      .querySelector('h3.card-title').textContent;
    // const taskVal=prompt()
    console.log(taskName);
    try {
      const result = await axios.post(
        `https://master--taskatt.netlify.app/delete`,
        { name: taskName, USER_ID: userId },
        { headers }
      );
      console.log(result.data);
      const newTasks = result.data;
      showTasks();
      if (result.data !== 'you are not authrized to delete other tasks') {
        // window.location.reload();
        navigate('/home/all');
        // navigate('/home', { replace: true });
      }

      console.log(newTasks);
    } catch (err) {
      console.log(err);
    }
  }
  async function editTask(e) {
    const userId = e.target
      .closest('div.card')
      .querySelector('input[type="hidden"]').value;
    const taskName = e.target
      .closest('.card')
      .querySelector('h3.card-title').textContent;
    const taskVal = prompt();
    console.log(taskName);
    console.log(taskVal);
    if (taskVal) {
      try {
        const result = await axios.post(
          `https://master--taskatt.netlify.app/edit`,
          {
            name: taskVal ? taskVal : taskName,
            Oldname: taskName,
            USER_ID: userId,
          },
          { headers }
        );
        console.log(result.data);
        const newTasks = result.data;
        showTasks();
        if (result.data !== 'you are not authrized to edit other tasks') {
          // window.location.reload();
          navigate('/home/all');

          // history.location.pathname = '/home';
          // history.replace(history.location.pathname); // Navigate to the same route
          // window.location.reload(); // Reload the page
          // navigate('/home', { replace: true });
        }
        // window.location.reload();
        console.log(newTasks);
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function showTasks() {
    try {
      const result = await axios.get('https://master--taskatt.netlify.app/home', { headers });
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
        <button className="edit-button" onClick={editTask}>
          Edit
        </button>
        <button className="delete-button" onClick={deleteTask}>
          Delete
        </button>
        <input type="hidden" value={data[2]}></input>
      </div>
    </div>
  );
}

export default Card;
