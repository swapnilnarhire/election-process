import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor for Error Normalization and Basic Retry
axiosClient.interceptors.response.use(
  (response) => {
    // Our standard API format wraps the real data in `data.data`
    if (response.data && response.data.success) {
      return response.data.data;
    }
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Basic Retry Logic for Network Errors or 5xx (Retry once)
    if (!originalRequest._retry && (!error.response || error.response.status >= 500)) {
      originalRequest._retry = true;
      try {
        return await axiosClient(originalRequest);
      } catch (retryError) {
        return Promise.reject(normalizeError(retryError));
      }
    }

    return Promise.reject(normalizeError(error));
  }
);

const normalizeError = (error) => {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error.message;
  }
  return error.message || 'An unexpected error occurred';
};

export default axiosClient;
