// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');

const headers = {
  // Define your headers here
  Authorization: `Bearer ${accessToken}`,
  // Add other headers if needed
};
// Create an async thunk for fetching data
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('http://localhost:8080/all', { headers });
  const data = await response.json();
  return data;
});

export const fetchDataUser = createAsyncThunk(
  'data/fetchDataUser',
  async () => {
    const response = await axios.get('http://localhost:8080/home', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const data = response.data;
    return data;
  }
);
export const addTask = createAsyncThunk(
  'data/addTask',
  async ({ valueTask }) => {
    console.log('addd ttttttsks');
    const response = await axios.post(
      'http://localhost:8080/add',
      { valueTask: valueTask },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    const data = response.data;
    return data;
  }
);
// export const deleteData = (userId, taskName) =>
//   createAsyncThunk('data/deleteData', async () => {
//     const response = await axios.post(
//       'http://localhost:8080/delete',
//       { name: taskName, USER_ID: userId },
//       { headers }
//     );
//     const data = await response.json();
//     console.log(data);
//     return data;
//   });

export const deleteData = createAsyncThunk(
  'data/deleteData',
  async ({ userId, taskName }) => {
    console.log(userId);
    console.log(taskName);
    const response = await axios.post(
      'http://localhost:8080/delete',
      { name: taskName, USER_ID: userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    return data;
  }
);
export const deleteDataOne = createAsyncThunk(
  'data/deleteDataOne',
  async ({ userId, taskName }) => {
    console.log(userId);
    console.log(taskName);
    const response = await axios.post(
      'http://localhost:8080/deleteOne',
      { name: taskName, USER_ID: userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    return data;
  }
);
export const editData = createAsyncThunk(
  'data/editData',
  async ({ userId, taskName, Oldname }) => {
    console.log(userId);
    console.log(taskName);
    console.log(Oldname);
    const response = await axios.post(
      'http://localhost:8080/edit',
      { name: taskName, USER_ID: userId, Oldname: Oldname },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    return data;
  }
);
// handleEditOne(userId, taskName,taskVal);

export const editDataOne = createAsyncThunk(
  'data/editDataOne',
  // { userId: taskId, taskName: name, Oldname: Oldname }
  async ({ userId, taskName, Oldname }) => {
    // console.log(userId);
    // console.log(taskName);
    // console.log(Oldname);
    const response = await axios.post(
      'http://localhost:8080/editOne',
      { name: taskName, USER_ID: userId, Oldname: Oldname },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    return data;
  }
);

export const clearLogOut = () => (dispatch) => {
  // Reset user-specific data to initial state
  dispatch(updateSlice.actions.clearOneuserTasks());
  localStorage.removeItem('accessToken');
};
const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};
// Create a slice
const updateSlice = createSlice({
  name: 'data',
  initialState: {
    userTasks: [],
    OneuserTasks: [],
    status: null,
    error: null,
  },
  reducers: {
    clearOneuserTasks: (state) => {
      state.OneuserTasks = [];
      state.status = null;
      state.error = null;
    },
  },

  extraReducers: {
    // builder.addCase(fetchData.fulfilled, (state, action) => {
    //   state.userTasks = action.payload; // Update userTasks with fetched data
    // });
    // [fetchData.pending]: (state) => {
    //   state.status = 'loading';
    //   state.error = null;
    // },
    [fetchData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.userTasks = action.payload;
    },
    [fetchData.rejected]: setError,

    [deleteData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.userTasks = action.payload;
    },
    [deleteData.rejected]: setError,

    [editData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.userTasks = action.payload;
    },
    [editData.rejected]: setError,

    [deleteDataOne.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.OneuserTasks = action.payload;
    },
    [deleteDataOne.rejected]: setError,

    [fetchDataUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.OneuserTasks = action.payload;
    },
    [fetchDataUser.rejected]: setError,

    [addTask.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.OneuserTasks = action.payload;
    },
    [addTask.rejected]: setError,

    [editDataOne.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.OneuserTasks = action.payload;
    },
    [editDataOne.rejected]: setError,
  },
});
export const { clearOneuserTasks } = updateSlice.actions;

export default updateSlice.reducer;
