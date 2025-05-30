import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/";

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}tasks`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTasks = createAsyncThunk(
  "tasks/add",
  async (task, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}tasks`, task);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setCompletedTask = createAsyncThunk(
  "tasks/compeleted",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${url}tasks/${taskId}`, {
        completed: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${url}tasks/${taskId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// helper reducer, for pending and rejected mode
const setPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // logic extra for using async thunk redux
    builder
      .addCase(fetchTasks.pending, setPending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTasks.rejected, setRejected);
    builder
      .addCase(fetchTasks.pending, setPending)
      .addCase(addTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(fetchTasks.rejected, setRejected);
    builder
      .addCase(fetchTasks.pending, setPending)
      .addCase(setCompletedTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id } = action.payload;
        const task = state.tasks.find((t) => t.id === id);
        task.completed = true;
      })
      .addCase(fetchTasks.rejected, setRejected);
    builder
      .addCase(fetchTasks.pending, setPending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id } = action.payload;
        state.tasks = state.tasks.filter((t) => t.id !== id);
      })
      .addCase(fetchTasks.rejected, setRejected);
  },
});

export default taskSlice.reducer;
