import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from './slices/userSlice';
import projectsInfoReducer from './slices/projectSlice';

const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    projectsInfo: projectsInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
