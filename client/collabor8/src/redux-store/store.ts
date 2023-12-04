import { configureStore } from '@reduxjs/toolkit';
import userStateReducer from './slices/userSlice';
import projectsInfoReducer from './slices/projectSlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    userState: userStateReducer,
    projectsInfo: projectsInfoReducer,
    chatState: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
