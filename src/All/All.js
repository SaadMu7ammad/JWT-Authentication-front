import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import axios from 'axios';
import Nav from '../Nav/Nav';
import openSocket from 'socket.io-client';
import '../Card/Card.css';
function All() {
  const [taskVal, setTask] = useState('');
  const [temp, settemp] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);
  const headers = {
    // Define your headers here
    Authorization: `Bearer ${accessToken}`,
    // Add other headers if needed
  };

  // showTasks();
  useEffect(() => {
    const socket = openSocket('https://texhnotes-api.onrender.com'); // Connect to the Socket.IO server

    socket.on('newTask', (newTask) => {
      // Listen for a new task event from the server
      console.log(newTask);
      settemp((prevTemp) => [...prevTemp, newTask]);
    });
    async function fetchTasks() {
      try {
        const newTemp = []; // Create a new array to store the tasks

        settemp([]);
        //   temp = [];
        const result = await axios.get('https://texhnotes-api.onrender.com/all', {
          headers,
        });
        //   console.log(result.data);
        result.data.map((item) => {
          //   console.log(item.task);
          item.task.forEach((element) => {
            console.log(element);

            newTemp.push(element);
          });
          settemp([...newTemp]);
        });
        // settemp(result.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchTasks();
  }, []);
  async function fetchTasks() {
    try {
      const newTemp = []; // Create a new array to store the tasks

      settemp([]);
      //   temp = [];
      const result = await axios.get('https://texhnotes-api.onrender.com/all', { headers });
      //   console.log(result.data);
      result.data.map((item) => {
        //   console.log(item.task);
        item.task.forEach((element) => {
          console.log(element);
          newTemp.push(element);
        });
        settemp([...newTemp]);
        openSocket('https://texhnotes-api.onrender.com');
      });
      // settemp(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {/* <button className="add" onClick={fetchTasks}>
        showTasks
      </button> */}
      {/* <input
        className="addTask"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        name="addTask"
        placeholder="enter a new task"
      ></input> */}

      <div className="taskCards">
        {temp.map((item, index) => (
          <Card key={index} data={[item.name, item.userName, item.id]} />
        ))}
      </div>
    </div>
  );
}

export default All;
