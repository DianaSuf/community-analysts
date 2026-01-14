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
    withCredentials: true,
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

      // Если 401 на запрос refresh токена - сразу logout
      if (statusCode === 401 && originalRequest.url === APIRoute.Refresh) {
        store.dispatch(logoutUser());
        throw error;
      }

      // Если 401 на обычный запрос - попробовать обновить токен
      if (statusCode === 401 && !originalRequest._retry && originalRequest.url !== APIRoute.Refresh) {
        originalRequest._retry = true;

        try {
          // Удаляем старый accessToken перед запросом на refresh
          localStorage.removeItem('accessToken');

          const { data } = await api.get<ITokenResponse>(APIRoute.Refresh);
          localStorage.setItem('accessToken', data.accessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          // Если refresh вернул 401 или другую ошибку - logout
          store.dispatch(logoutUser());
          throw refreshError;
        }
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
