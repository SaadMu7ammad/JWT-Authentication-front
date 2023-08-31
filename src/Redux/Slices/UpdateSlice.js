import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const accessToken = localStorage.getItem('accessToken');

// const headers = {
//   Authorization: `Bearer ${accessToken}`,
// };
// Create an async thunk for fetching data
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('http://localhost:8080/all', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
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

export const deleteData = createAsyncThunk(
  'data/deleteData',
  async ({ userId, taskName }) => {

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
    return data;
  }
);
export const deleteDataOne = createAsyncThunk(
  'data/deleteDataOne',
  async ({ userId, taskName }) => {
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
    return data;
  }
);
export const editData = createAsyncThunk(
  'data/editData',
  async ({ userId, taskName, Oldname }) => {
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
    return data;
  }
);

export const editDataOne = createAsyncThunk(
  'data/editDataOne',
  async ({ userId, taskName, Oldname }) => {
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
    return data;
  }
);

// export const clearLogOut = () => (dispatch) => {
//   dispatch(updateSlice.actions.clearOneuserTasks());
//   localStorage.removeItem('accessToken');
// };
const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};
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
