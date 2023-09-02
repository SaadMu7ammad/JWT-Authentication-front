import React, { useEffect, useState } from 'react';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';

import {
  deleteData,
  editData,
  deleteDataOne,
  editDataOne,
  fetchData,
  fetchDataUser,
} from '../Redux/Slices/UpdateSlice';

function Card({ data }) {
  let tasks = useSelector((state) => state.data.userTasks);
  const [temp, settemp] = useState([tasks]);
  const dispatch = useDispatch();
  // let tasks = useSelector((state) => state.data.userTasks);

  const handleDelete = async (taskId, name) => {
    try {
      const resultAction = await dispatch(
        deleteData({ userId: taskId, taskName: name })
      );
      if (deleteData.fulfilled.match(resultAction)) {
        console.log('Delete operation successful.');
      }
    } catch (error) {
      console.log('Delete operation failed.');
    }
  };
  const handleDeleteOne = async (taskId, name) => {
    try {
      const resultAction = await dispatch(
        deleteDataOne({ userId: taskId, taskName: name })
      );
      if (deleteDataOne.fulfilled.match(resultAction)) {
        console.log('Delete operation successful.');
      }
    } catch (error) {
      console.log('Delete operation failed.');
    }
  };
  const handleEdit = async (taskId, name, Oldname) => {
    try {
      const resultAction = await dispatch(
        editData({ userId: taskId, taskName: name, Oldname: Oldname })
      );
      if (editData.fulfilled.match(resultAction)) {
        console.log('edit operation successful.');
      }
    } catch (error) {
      console.log('edit operation failed.');
    }
  };
  const handleEditOne = async (taskId, name, Oldname) => {
    try {
      const resultAction = await dispatch(
        editDataOne({ userId: taskId, taskName: name, Oldname: Oldname })
      );
      if (editDataOne.fulfilled.match(resultAction)) {
        console.log('edit operation successful.');
      }
    } catch (error) {
      console.log('edit operation failed.');
    }
  };

  async function deleteTask(e) {
    const userId = e.target
      .closest('div.card')
      .querySelector('input[type="hidden"]').value;
    const taskName = e.target
      .closest('.card')
      .querySelector('h3.card-title').textContent;
    // console.log(taskName);
    handleDelete(userId, taskName);
  }
  async function deleteTaskOne(e) {
    const userId = e.target
      .closest('div.card')
      .querySelector('input[type="hidden"]').value;
    const taskName = e.target
      .closest('.card')
      .querySelector('h3.card-title').textContent;
    // console.log(taskName);
    handleDeleteOne(userId, taskName);
  }
  async function editTaskOne(e) {
    const userId = e.target
      .closest('div.card')
      .querySelector('input[type="hidden"]').value;
    const taskName = e.target
      .closest('.card')
      .querySelector('h3.card-title').textContent;
    const taskVal = prompt();
    handleEditOne(userId, taskVal, taskName);
  }

  async function editTask(e) {
    const userId = e.target
      .closest('div.card')
      .querySelector('input[type="hidden"]').value;
    const taskName = e.target
      .closest('.card')
      .querySelector('h3.card-title').textContent;
    const newTaskVal = prompt();
    handleEdit(userId, newTaskVal, taskName);
  }

  useEffect(() => {
    const socket = openSocket('http://localhost:8080'); // Connect to the Socket.IO server

    socket.on('newTask', (newTask) => {
      console.log('socket at card');
      if (newTask.action === 'delete') {
        settemp([...newTask.task]);
        // console.log([...newTask.task]);
        dispatch(fetchDataUser());
        dispatch(fetchData());

      }else if (newTask.action === 'edit') {
        settemp([...newTask.task]);
        dispatch(fetchDataUser());
        dispatch(fetchData());
      }
    });

    console.log('all page useEffect');
  }, []);
  return (
    <div className="card">
      <h3 className="card-title">{data[0]}</h3>
      <p>added by {data[1]}</p>
      {data[3] === true ? (
        <div className="card-buttons">
          <button className="edit-button" onClick={editTask}>
            Edit
          </button>
          <button className="delete-button" onClick={deleteTask}>
            Delete
          </button>
          <input type="hidden" value={data[2]}></input>
        </div>
      ) : (
        <div className="card-buttons">
          <button className="edit-button" onClick={editTaskOne}>
            Edit
          </button>
          <button className="delete-button" onClick={deleteTaskOne}>
            Delete
          </button>
          <input type="hidden" value={data[2]}></input>
        </div>
      )}
    </div>
  );
}

export default Card;
