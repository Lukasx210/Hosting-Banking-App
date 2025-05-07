import { API_BASE_URL } from '@/config/serverApiConfig';

import axios from 'axios';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';
import storePersist from '@/store/storePersist';
import apiInstance from '@/middleware/client-middleware';

export const getToken = () => {
  var accessToken;
  try {
    accessToken = storePersist.get('auth').access_token;
  } catch (error) {}
  return accessToken;
};
export const getRefreshToken = () => {
  var refreshToken;
  try {
    refreshToken = storePersist.get('auth').refresh_token;
  } catch (error) {}
  return refreshToken;
};
export const setTokens = ({ access_token, refresh_token }) => {
  try {
    let auth = storePersist.get('auth');
    auth.current.access_token = access_token;
    auth.current.refresh_token = refresh_token;
    auth.access_token = access_token;
    auth.refresh_token = refresh_token;

    storePersist.set('auth', auth);
  } catch (err) {}
};
export const login = async ({ loginData }) => {
  try {
    const response = await axios.post(API_BASE_URL + `v1/auth/authenticate`, loginData);

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
export const refreshToken = async () => {
  try {
    const response = await axios.post(API_BASE_URL + `v1/auth/refresh-token`, {},{
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`, // Add refresh token in headers
        'Content-Type': 'application/json', // Ensure JSON format
        'Access-Control-Allow-Origin': '*', // Allow all origins (only for debugging)
        'Access-Control-Allow-Credentials': 'true',
      },
      withCredentials: true, // Ensure credentials are sent with the request
    });

    const { status, data } = response;
    if (data.result)
       setTokens(data.result);
    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
export const register = async ({ registerData }) => {
  try {
    const response = await axios.post(API_BASE_URL + `v1/auth/register`, registerData);

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const verify = async ({ userId, emailToken }) => {
  try {
    const response = await axios.get(API_BASE_URL + `verify/${userId}/${emailToken}`);

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const resetPassword = async ({ resetPasswordData }) => {
  try {
    const response = await axios.post(API_BASE_URL + `resetpassword`, resetPasswordData);

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
export const logout = async () => {
  axios.defaults.withCredentials = true;
  try {
    // window.localStorage.clear();
    const response = await apiInstance.post(
      `auth/logout`,
      {},
    );
    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      }
    );
    return data;
  } catch (error) {
    // return errorHandler(error);
  }
};
export const hasRole = (role, roles) => {
  // window.localStorage.clear();
  let result = false;
  roles?.forEach((r) => {
    if (r.name === role) result = true;
  });
  return result;
};
