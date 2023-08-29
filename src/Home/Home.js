import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from '../Card/Card';
import Nav from '../Nav/Nav';
import './Home.css';
import {
  deleteDataOne,
  fetchData,
  fetchDataUser,
  addTask,
} from '../Redux/Slices/UpdateSlice';

import { useSelector } from 'react-redux/es/hooks/useSelector';
// import openSocket from 'socket.io-client';
import axios from 'axios';
function Home() {
  let tasksOneUser = useSelector((state) => state.data.OneuserTasks);
  const dispatch = useDispatch();
  const [taskVal, setTask] = useState('');
  const [temp, settemp] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);
  const headers = {
    // Define your headers here
    Authorization: `Bearer ${accessToken}`,
    // Add other headers if needed
  };
  // function addTask() {
  //   axios
  //     .post('http://localhost:8080/add', { name: taskVal }, { headers })
  //     .then((result) => {
  //       //  showTasks();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  function addUserTask(e) {
    const valueTask = document.querySelector('input.addTask').value;
    // const taskName = e.target
    // .closest('input.addTask').value
    // console.log(taskName);
    handlefetchUserTask(valueTask);
  }
  const handlefetchUserTask = async (valueTask) => {
    try {
      const resultAction = await dispatch(addTask({ valueTask: valueTask }));
      if (addTask.fulfilled.match(resultAction)) {
        console.log('added operation successful.');
      }
    } catch (error) {
      console.log('added operation failed.');
    }
  };
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
  // showTasks();
  useEffect(() => {
    // const socket = openSocket('http://localhost:8080'); // Connect to the Socket.IO server

    // socket.on('newTask', (newTask) => {
    //   // Listen for a new task event from the server
    //   console.log(newTask);
    //   settemp((prevTemp) => [...prevTemp, newTask]);
    // });
    // async function fetchTasks() {
    //   try {
    //     const result = await axios.get('http://localhost:8080/home', { headers });
    //     console.log(result.data);
    //     settemp(result.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    console.log('change saad here');
    // dispatch(addTask());
    dispatch(fetchDataUser());
    dispatch(addTask());

    // console.log(tasksOneUser);
    // dispatch(deleteDataOne());
    // fetchTasks();
  }, []);
  return (
    <div>
      <Nav></Nav>
      <button className="add" onClick={addUserTask}>
        add task
      </button>
      {/* <button className="add" onClick={fetchTasks}>
        showTasks
      </button> */}
      <input
        className="addTask"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        name="addTask"
        placeholder="enter a new task"
      ></input>
      <div className="taskCards">
        {tasksOneUser.map((item, index) => (
          <Card key={index} data={[item.name, item.userName, item.id]} />
        ))}
      </div>
    </div>
  );
}

export default Home;
