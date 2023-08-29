import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import axios from 'axios';
import Nav from '../Nav/Nav';
import openSocket from 'socket.io-client';
import '../Card/Card.css';
import { fetchData } from '../Redux/Slices/UpdateSlice';
import { useDispatch, useSelector } from 'react-redux';
function All() {
  const [taskVal, setTask] = useState('');
  let tasks = useSelector((state) => state.data.userTasks);
  const [temp, settemp] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);
  const dispatch = useDispatch();

  const headers = {
    // Define your headers here
    Authorization: `Bearer ${accessToken}`,
    // Add other headers if needed
  };

  // showTasks();
  useEffect(() => {
    // const socket = openSocket('http://localhost:8080'); // Connect to the Socket.IO server

    // socket.on('newTask', (newTask) => {
    //   // Listen for a new task event from the server
    //   console.log(newTask);
    //   settemp((prevTemp) => [...prevTemp, newTask]);
    // });
    dispatch(fetchData());
    // async function fetchTasks() {
    //   try {
    //     const newTemp = []; // Create a new array to store the tasks

    //     settemp([]);
    //     //   temp = [];
    //     const result = await axios.get('http://localhost:8080/all', {
    //       headers,
    //     });
    //     //   console.log(result.data);
    //     result.data.map((item) => {
    //       //   console.log(item.task);
    //       item.task.forEach((element) => {
    //         console.log(element);

    //         newTemp.push(element);
    //       });
    //       settemp([...newTemp]);
    //     });
    //     // settemp(result.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // fetchTasks();
    // temp.map((item, index) =>
    //   item.task.map((it, indx) => {
    //     console.log(it.name, it.userName, it.id);
    //   })
    // );
    console.log('change saad here');
    // settemp([...tasks]);
    // tasks=[...temp]
  }, [dispatch]);
  // async function fetchTasks() {
  //   try {
  //     const newTemp = []; // Create a new array to store the tasks

  //     settemp([]);
  //     //   temp = [];
  //     const result = await axios.get('http://localhost:8080/all', { headers });
  //     //   console.log(result.data);
  //     result.data.map((item) => {
  //       //   console.log(item.task);
  //       item.task.forEach((element) => {
  //         console.log(element);
  //         newTemp.push(element);
  //       });
  //       settemp([...newTemp]);
  //       openSocket('http://localhost:8080');
  //     });
  //     // settemp(result.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
        {tasks.map((item, index) =>
          item.task.map((it, indx) => {
            return <Card key={indx} data={[it.name, it.userName, it.id]} />;
          })
        )}
      </div>

      {/* <div className="taskCards">
        {tasks.map((item, index) =>
          item.task.map((it, indx) => (
            <Card key={indx} data={[it.name, it.userName, it.id]} />
          ))
        )}
      </div> */}
    </div>
  );
}

export default All;
