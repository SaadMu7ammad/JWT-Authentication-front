// // dataSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Create an async thunk for fetching data
// export const fetchData = createAsyncThunk('data/fetchData', async () => {
//   const response = await fetch('http://localhost:8080/all');
//   const data = await response.json();
//   return data;
// });

// // Create a slice
// const updateSlice  = createSlice({
//   name: 'data',
//   initialState: {
//     userTasks: [],
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchData.fulfilled, (state, action) => {
//       state.userTasks = action.payload; // Update userTasks with fetched data
//     });
//   },
// });

// export default updateSlice.reducer;
