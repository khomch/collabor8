import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUserInfo } from '../../types/types';
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

type TUserState = {
  isLogged: boolean;
  userId: string | null;
  user: TUserInfo | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  isLoading: boolean;
};

const initialState: TUserState = {
  isLogged: false,
  userId: null,
  user: null,
  status: 'idle',
  error: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action?.payload?._id || null;
        state.isLoading = false;
        if (state.userId) {
          state.isLogged = true;
        } else {
          state.isLogged = false;
        }
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchUserDetails };

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
