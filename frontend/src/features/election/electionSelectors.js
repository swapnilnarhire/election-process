import { createSelector } from '@reduxjs/toolkit';

const selectElectionState = (state) => state.election;

// Raw selectors
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

// Method-aware selectors
export const selectActiveMethod = createSelector(
  [selectElectionState],
  (election) => election.activeMethod
);

export const selectAvailableMethods = createSelector(
  [selectElectionState],
  (election) => election.config?.availableMethods || []
);

export const selectFilteredProcess = createSelector(
  [selectProcess, selectActiveMethod],
  (process, method) => {
    if (method === 'compare') return process;
    return process.filter((item) => item.methods.includes(method));
  }
);

export const selectFilteredTimeline = createSelector(
  [selectTimeline, selectActiveMethod],
  (timeline, method) => {
    if (method === 'compare') return timeline;
    return timeline.filter((item) => item.methods.includes(method));
  }
);

export const selectFilteredFaqs = createSelector(
  [selectFaqs, selectActiveMethod],
  (faqs, method) => {
    if (method === 'compare') return faqs;
    return faqs.filter((item) => item.methods.includes(method));
  }
);

// Compare mode helpers
export const selectOfflineProcess = createSelector(
  [selectProcess],
  (process) => process.filter((item) => item.methods.includes('offline'))
);

export const selectOnlineProcess = createSelector(
  [selectProcess],
  (process) => process.filter((item) => item.methods.includes('online'))
);
