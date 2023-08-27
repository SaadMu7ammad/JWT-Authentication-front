import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import axios from 'axios';
import Nav from '../Nav/Nav';
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

  async function fetchTasks() {
      try {
        const newTemp = []; // Create a new array to store the tasks

          settemp([])
        //   temp = [];
      const result = await axios.get('http://localhost:8080/all', { headers });
      //   console.log(result.data);
        result.data.map((item) => {
        //   console.log(item.task);
        item.task.forEach((element) => {
            console.log(element);
            newTemp.push(element)
        });
            settemp([...newTemp])
      });
      // settemp(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    async function fetchTasks() {
        try {
            const newTemp = []; // Create a new array to store the tasks
    
              settemp([])
            //   temp = [];
          const result = await axios.get('http://localhost:8080/all', { headers });
          //   console.log(result.data);
            result.data.map((item) => {
            //   console.log(item.task);
            item.task.forEach((element) => {
                console.log(element);

                newTemp.push(element)
            });
                settemp([...newTemp])
          });
          // settemp(result.data);
        } catch (err) {
          console.log(err);
        }
    }
    
    fetchTasks();
  }, []); 
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
