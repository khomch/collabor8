import { getChats } from '@/apiService/chatService';
import { TChat, TMessage } from '@/types/chat-types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchChats = createAsyncThunk('getChats', async () => {
  const response = await getChats();
  return response;
});

type TChatState = {
  chats: TChat[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  lastMessage: TMessage | null;
  newMessages: number;
};

const initialState: TChatState = {
  chats: null,
  status: 'idle',
  error: null,
  lastMessage: null,
  newMessages: 0,
};

const chatsSlice = createSlice({
  name: 'chatsSlice',
  initialState,
  reducers: {
    readChatMessages: (state, action) => {
      const chat = state.chats
        ?.slice()
        .find((chat) => chat._id === action.payload.chatId);
      if (chat) {
        state.newMessages -= chat.unreadCount;
        chat.unreadCount = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.chats = action?.payload?.data;
        state.newMessages =
          state.chats?.reduce(
            (acc, curr) => acc + (curr.unreadCount || 0),
            0
          ) || 0;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export { fetchChats };

export const { readChatMessages } = chatsSlice.actions;

export default chatsSlice.reducer;
