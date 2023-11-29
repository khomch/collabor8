import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import userStateReducer from './slices/userSlice';
import projectsInfoReducer from './slices/projectSlice';

const store = configureStore({
  reducer: {
    userState: userStateReducer,
    projectsInfo: projectsInfoReducer,
  },
});
=======
import userStateReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    userState: userStateReducer
  },
})
>>>>>>> 8d2613ab96f438474ec95f366076209f0e7af4c4

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
