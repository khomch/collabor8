import { getProjectListing } from '@/apiService/projectServicesApi';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TProjectInfo } from '../../types/types';

const fetchProjects = createAsyncThunk('getProjects', async () => {
  const response = await getProjectListing();
  return response;
});

type TPRojectsState = {
  projects: TProjectInfo[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const initialState: TPRojectsState = {
  projects: null,
  status: 'idle',
  error: null,
};

const projectsSlice = createSlice({
  name: 'projectsSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.projects = action.payload.data;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export { fetchProjects };

export const { } = projectsSlice.actions;

export default projectsSlice.reducer;
