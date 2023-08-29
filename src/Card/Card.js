import React, { useEffect, useState } from 'react';
import './Card.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, deleteData, editData,deleteDataOne, fetchDataUser, addTask } from '../Redux/Slices/UpdateSlice';

function Card({ data }) {
  // console.log(data)
  // const history = useHistory();

  const dispatch = useDispatch();
  let tasks = useSelector((state) => state.data.userTasks);

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
    handleDelete(userId, taskName);
    // try {
    //   const result = await axios.post(
    //     `http://localhost:8080/delete`,
    //     { name: taskName, USER_ID: userId },
    //     { headers }
    //   );
    //   console.log(result.data);
    //   const newTasks = result.data;
    //   showTasks();

    //   if (result.data !== 'you are not authrized to delete other tasks') {
    //     // window.location.reload();
    //     // navigate('/home');
    //     // navigate('/home', { replace: true });
    //   }

    //   console.log(newTasks);
    // } catch (err) {
    //   console.log(err);
    // }
  }
  async function deleteTaskOne(e) {
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
    handleDeleteOne(userId, taskName);
   
  }
  useEffect(() => {
    dispatch(fetchData());
    dispatch(deleteData());
    dispatch(editData());
    dispatch(deleteDataOne());
    dispatch(fetchDataUser());
    dispatch(addTask());
  }, []);
  async function editTask(e) {
    const userId = e.target
      .closest('div.card')
      .querySelector('input[type="hidden"]').value;
    const taskName = e.target
      .closest('.card')
      .querySelector('h3.card-title').textContent;
    const newTaskVal = prompt();
    // console.log(taskName);
    // console.log(newTaskVal);

    handleEdit(userId, newTaskVal, taskName);
    // if (taskVal) {
    //   try {
    //     const result = await axios.post(
    //       `http://localhost:8080/edit`,
    //       {
    //         name: taskVal ? taskVal : taskName,
    //         Oldname: taskName,
    //         USER_ID: userId,
    //       },
    //       { headers }
    //     );
    //     console.log(result.data);
    //     const newTasks = result.data;
    //     // showTasks();
    //     if (result.data !== 'you are not authrized to edit other tasks') {
    //       // window.location.reload();
    //       // navigate('/home');
    //       // history.location.pathname = '/home';
    //       // history.replace(history.location.pathname); // Navigate to the same route
    //       // window.location.reload(); // Reload the page
    //       // navigate('/home', { replace: true });
    //     }
    //     // window.location.reload();
    //     console.log(newTasks);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }
  // async function showTasks() {
  //   try {
  //     const result = await axios.get('http://localhost:8080/home', { headers });
  //     const newTasks = result.data;
  //     settemp(newTasks);
  //     console.log(newTasks);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
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
          <button className="edit-button" onClick={editTask}>
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
