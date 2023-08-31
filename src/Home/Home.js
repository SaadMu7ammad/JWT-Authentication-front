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
  // const [temp, settemp] = useState([]);


  function addUserTask(e) {
    const valueTask = document.querySelector('input.addTask').value;
   
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

  useEffect(() => {
    // const socket = openSocket('http://localhost:8080'); // Connect to the Socket.IO server

    // socket.on('newTask', (newTask) => {
    //   // Listen for a new task event from the server
    //   console.log(newTask);
    //   settemp((prevTemp) => [...prevTemp, newTask]);
    // });
    console.log('home useEffect');
    dispatch(fetchDataUser());
  }, [dispatch]);
  return (
    <div>
      <Nav></Nav>
      <button className="add" onClick={addUserTask}>
        add task
      </button>
     
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
