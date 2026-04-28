import axiosClient from '../axiosClient';

export const electionAPI = {
  getConfig: () => axiosClient.get('/config'),
  getProcess: () => axiosClient.get('/process'),
  getTimeline: () => axiosClient.get('/timeline'),
  getFaqs: () => axiosClient.get('/faq'),
};
