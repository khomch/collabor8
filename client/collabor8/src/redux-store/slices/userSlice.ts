import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDetails } from '../../apiService/userServicesApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { TUserState, TUserInfo } from '../../types/types';

const fetchUserDetails = createAsyncThunk('getUserDetails', async () => {
  const email = localStorage.getItem('userEmail');
  const response = await getUserDetails(email);
  return response;
})

const initialState: TUserState = {
  loggedUser: null,
  status: 'idle',
  error: null
}

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<TUserInfo>) => {
        state.status = 'succeeded';
        state.loggedUser = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export { fetchUserDetails };

export default userDetailsSlice.reducer;