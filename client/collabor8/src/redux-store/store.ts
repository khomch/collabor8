import { combineReducers } from '@reduxjs/toolkit';
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

// For unit tests
export const rootReducer = combineReducers({
  userState: userStateReducer,
  projectsInfo: projectsInfoReducer,
});

export default store;
