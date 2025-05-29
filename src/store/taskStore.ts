import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // common logic for reducer
    loadTasks: (state, action) => {
      // do notthing with the api,
      // will use this reducers for case like load from local storage
      // or kind of things
      // used for addTasks, we can imediately add  the new task to the state
      // then show to the user immediately, after that we call the api to add task to database
      // in specific case when user need to see the result as soon as they clicked add task
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    // logic extra for using async thunk redux
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { loadTasks } = taskSlice.actions;

export default taskSlice.reducer;
