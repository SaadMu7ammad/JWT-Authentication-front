import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import axios from 'axios';
import Nav from '../Nav/Nav';
import openSocket from 'socket.io-client';
import '../Card/Card.css';
import { fetchData, fetchDataUser } from '../Redux/Slices/UpdateSlice';
import { useDispatch, useSelector } from 'react-redux';
function All() {
  // const [taskVal, setTask] = useState('');
  let tasks = useSelector((state) => state.data.userTasks);
  const [temp, settemp] = useState([tasks]);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = openSocket('http://localhost:8080'); // Connect to the Socket.IO server

    socket.on('newTask', (newTask) => {
      console.log('socket at All');
      console.log(newTask.task);
      if (newTask.action === 'add') {
        //   // Listen for a new task event from the server
        //   console.log(newTask);
        // tasks.push(newTask.task);
        settemp([...temp], newTask.task);
        dispatch(fetchData());
        dispatch(fetchDataUser());
      }
      //   settemp((prevTemp) => [...prevTemp, newTask]);
    });
    dispatch(fetchData());

    console.log('all page useEffect');
  }, []);

  return (
    <div>
      <div className="taskCards">
        {tasks.map((item, index) =>
          item.task.map((it, indx) => {
            return (
              <Card key={indx} data={[it.name, it.userName, it.id, true]} />
            );
          })
        )}
      </div>
    </div>
  );
}

export default All;
