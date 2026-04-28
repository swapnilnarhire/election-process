import { configureStore } from '@reduxjs/toolkit';
import electionReducer from '../features/election/electionSlice';

export const store = configureStore({
  reducer: {
    election: electionReducer,
  },
});
