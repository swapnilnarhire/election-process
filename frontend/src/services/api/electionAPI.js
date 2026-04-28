import axiosClient from '../axiosClient';

export const electionAPI = {
  getProcess: () => axiosClient.get('/process'),
  getTimeline: () => axiosClient.get('/timeline'),
  getFaqs: () => axiosClient.get('/faq'),
};
