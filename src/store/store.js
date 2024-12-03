import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../redux/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});