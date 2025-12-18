import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import type { ITokenResponse } from '../types/user-data';
import { APIRoute } from '../const';
import { logoutUser } from '../store/slices/user-slice';
import { store } from '../store'

const BACKEND_URL = 'http://localhost:8080/';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.OK]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('accessToken');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<DetailMessageType>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (!originalRequest) {
        throw error;
      }
  
      const statusCode = error.response?.status;

      if (statusCode === 401 && !originalRequest._retry && originalRequest.url !== APIRoute.Refresh) {
        originalRequest._retry = true;
        localStorage.removeItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          try {
            const { data } = await api.post<ITokenResponse>(APIRoute.Refresh, { token: refreshToken });

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            }

            return api(originalRequest);
          } catch (refreshError) {
            store.dispatch(logoutUser());
            throw refreshError;
          }
        } else {
          store.dispatch(logoutUser());
        }
      }

      if (statusCode === 401 && (originalRequest._retry || originalRequest.url === APIRoute.Refresh)) {
        store.dispatch(logoutUser());
      }
      
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;
        toast.warn(detailMessage.message);
      }
  
      throw error;
    }
  );

  return api;
};
