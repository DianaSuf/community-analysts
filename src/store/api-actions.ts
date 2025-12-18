import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from '../types/state';
import type { IAuthRole, IRegisterData, ITokenResponse, ILoginData } from '../types/user-data';
import { APIRoute, type AuthorizationStatusType, AuthorizationStatus, AppRoute } from '../const';
import { redirectToRoute } from './action';

export const checkAuthAction = createAsyncThunk<AuthorizationStatusType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    try {
      const { data: { role } } = await api.get<IAuthRole>(APIRoute.Status);
      return AuthorizationStatus[role as keyof typeof AuthorizationStatus] ?? AuthorizationStatus.UNKNOWN;
    } catch {
      return AuthorizationStatus.UNKNOWN;
    }
  },
);

export const registerAction = createAsyncThunk<void, IRegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/register',
  async ({ name, email, password, position }, { extra: api }) => {
    await api.post(APIRoute.Register, { name, email, password, position });
  }
);

export const loginAction = createAsyncThunk<void, ILoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data: { accessToken, refreshToken } } = await api.post<ITokenResponse>(APIRoute.Login, { email, password });
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    await dispatch(checkAuthAction());
    dispatch(redirectToRoute(AppRoute.Profile));
  }
);
