import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { electionAPI } from '../../services/api/electionAPI';

export const fetchElectionData = createAsyncThunk(
  'election/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [config, process, timeline, faqs] = await Promise.all([
        electionAPI.getConfig(),
        electionAPI.getProcess(),
        electionAPI.getTimeline(),
        electionAPI.getFaqs(),
      ]);
      return { config, process, timeline, faqs };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  config: {
    availableMethods: [],
  },
  process: [],
  timeline: [],
  faqs: [],
  activeMethod: 'offline',
  loading: false,
  error: null,
  globalError: null,
};

const electionSlice = createSlice({
  name: 'election',
  initialState,
  reducers: {
    setMethod: (state, action) => {
      state.activeMethod = action.payload;
    },
    clearGlobalError: (state) => {
      state.globalError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchElectionData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.globalError = null;
      })
      .addCase(fetchElectionData.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload.config;
        state.process = action.payload.process;
        state.timeline = action.payload.timeline;
        state.faqs = action.payload.faqs;
      })
      .addCase(fetchElectionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.globalError = action.payload;
      });
  },
});

export const { setMethod, clearGlobalError } = electionSlice.actions;
export default electionSlice.reducer;
