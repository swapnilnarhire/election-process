import { createSelector } from '@reduxjs/toolkit';

const selectElectionState = (state) => state.election;

export const selectProcess = createSelector(
  [selectElectionState],
  (election) => election.process
);

export const selectTimeline = createSelector(
  [selectElectionState],
  (election) => election.timeline
);

export const selectFaqs = createSelector(
  [selectElectionState],
  (election) => election.faqs
);

export const selectLoading = createSelector(
  [selectElectionState],
  (election) => election.loading
);

export const selectError = createSelector(
  [selectElectionState],
  (election) => election.error
);

export const selectGlobalError = createSelector(
  [selectElectionState],
  (election) => election.globalError
);
