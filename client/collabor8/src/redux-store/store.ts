import { combineReducers } from '@reduxjs/toolkit';
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

// For unit tests
export const rootReducer = combineReducers({
  userState: userStateReducer,
  projectsInfo: projectsInfoReducer,
});

export default store;
