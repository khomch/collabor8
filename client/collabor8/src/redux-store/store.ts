import { configureStore } from '@reduxjs/toolkit';
import userStateReducer from './slices/userSlice';
import projectsInfoReducer from './slices/projectSlice';

const store = configureStore({
  reducer: {
    userState: userStateReducer,
    projectsInfo: projectsInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
