import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskStore";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
//   middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export default store;
