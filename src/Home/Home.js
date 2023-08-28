import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Nav from '../Nav/Nav';
import './Home.css';
import { useLocation } from 'react-router-dom';
// import openSocket from 'socket.io-client';

import axios from 'axios';
function Home() {

  const [taskVal, setTask] = useState('');
  const [temp, settemp] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);
  const headers = {
    // Define your headers here
    Authorization: `Bearer ${accessToken}`,
    // Add other headers if needed
  };
  function addTask() {
    axios
      .post('https://taskat-xme4.onrender.com/add', { name: taskVal }, { headers })
      .then((result) => {
         showTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function showTasks() {
    try {
      const result = await axios.get('https://taskat-xme4.onrender.com/home', { headers });
      const newTasks = result.data;
      settemp(newTasks);
      console.log(newTasks);
      
    } catch (err) {
      console.log(err);
    }
  }
  // showTasks();
  useEffect(() => {
    // const socket = openSocket('https://taskat-xme4.onrender.com'); // Connect to the Socket.IO server

    // socket.on('newTask', (newTask) => {
    //   // Listen for a new task event from the server
    //   console.log(newTask);
    //   settemp((prevTemp) => [...prevTemp, newTask]);
    // });
    async function fetchTasks() {
      try {
        const result = await axios.get('https://taskat-xme4.onrender.com/home', { headers });
        console.log(result.data);
        settemp(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    
    fetchTasks();
  }, []); 
  return (
    
    <div>
      <Nav ></Nav>
      <button className="add" onClick={addTask}>
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
        {temp.map((item, index) => (
          <Card key={index} data={[item.name,item.userName,item.id]} />
        ))}
      </div>
    </div>
  );
}

export default Home;
