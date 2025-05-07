import { getRefreshToken, getToken, refreshToken } from '@/auth';
import { API_BASE_URL } from '@/config/serverApiConfig';
import axios from 'axios';

export const version_1 = 'v1';
let isRefreshing = false;
let refreshSubscribers = [];

// Notify all waiting requests with new token
const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Add a request to wait for the refreshed token
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Global request interceptor (applies to all axios requests)
axios.interceptors.request.use(
  (config) => {
    console.log('request', config);
    config.headers['Access-Control-Allow-*'] = '*';
    config.headers.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (config) => {
    console.log('response', config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create a custom axios instance
export const apiInstance = axios.create({
  baseURL: API_BASE_URL + version_1,
});
// Request interceptor to attach the access token
apiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.withCredentials=true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401 errors
apiInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 (Unauthorized) response only once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Wait for the refresh token process to complete
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // Call the refresh token function and await response
        const refreshedData = await refreshToken();

        if (!refreshedData || !refreshedData.access_token) {
          throw new Error('Failed to refresh token');
        }

        const newAccessToken = refreshedData.access_token;
        
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // Notify all subscribers waiting for the new token
        onTokenRefreshed(newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        // localStorage.clear();
        // window.location.href = '/auth/login'; // Redirect to login page
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
