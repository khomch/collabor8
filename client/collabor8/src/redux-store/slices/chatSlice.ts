import { getProjectListing } from '@/apiService/projectServicesApi';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TProjectInfo } from '../../types/types';
import { TChat } from '@/types/chat-types';

const fetchChats = createAsyncThunk('getChats', async () => {
  const response = await getProjectListing();
  return response;
});

type TPRojectsState = {
  chats: TChat[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const initialState: TPRojectsState = {
  chats: null,
  status: 'idle',
  error: null,
};

const chatsSlice = createSlice({
  name: 'chatsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.chats = action?.payload?.data;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export { fetchChats };

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;
