import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './slice/questionSlice';
import movieReducer from './slice/moviedbSlice';

const store = configureStore({
  reducer: {
    question : questionReducer,
    movie : movieReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
