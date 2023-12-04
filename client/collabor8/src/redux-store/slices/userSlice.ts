import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUserState } from '../../types/types';
import { getUserProfile } from '@/apiService/profileServiceApi';

const fetchUserDetails = createAsyncThunk('getUserDetails', async () => {
  try {
    const response = await getUserProfile();
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log('Error while getting user details', error);
  }
});

export const initialState: TUserState = {
  isLogged: false,
  userId: null,
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action?.payload?._id || null;
        if (state.userId) {
          state.isLogged = true;
        } else {
          state.isLogged = false;
        }
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export { fetchUserDetails };

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
