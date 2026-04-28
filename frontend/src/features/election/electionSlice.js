import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { electionAPI } from '../../services/api/electionAPI';

export const fetchElectionData = createAsyncThunk(
  'election/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const [process, timeline, faqs] = await Promise.all([
        electionAPI.getProcess(),
        electionAPI.getTimeline(),
        electionAPI.getFaqs(),
      ]);
      return { process, timeline, faqs };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  process: [],
  timeline: [],
  faqs: [],
  loading: false,
  error: null,
  globalError: null, // Used for snackbar
};

const electionSlice = createSlice({
  name: 'election',
  initialState,
  reducers: {
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
        state.process = action.payload.process;
        state.timeline = action.payload.timeline;
        state.faqs = action.payload.faqs;
      })
      .addCase(fetchElectionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.globalError = action.payload; // Trigger snackbar
      });
  },
});

export const { clearGlobalError } = electionSlice.actions;
export default electionSlice.reducer;
